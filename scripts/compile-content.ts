import { createHash } from 'node:crypto';
import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeExpressiveCode, { createRenderer } from 'rehype-expressive-code';
import { toText } from 'hast-util-to-text';
import { toString } from 'mdast-util-to-string';
import readingTime from 'reading-time';
import sharp from 'sharp';
import type { Element, Root, RootContent } from 'hast';
import type { Root as MarkdownRoot, RootContent as MarkdownNode } from 'mdast';
import { contentId, pageSchema, postSchema } from '../src/content.config.ts';
import type { ContentNode, ContentPage } from '../src/content/types.ts';
import { expressiveCodeOptions } from '../src/site.config.ts';

const kinds = new Set(['note', 'tip', 'info', 'warning', 'danger', 'success', 'example', 'quote']);
// Explicit allowlist: unknown/custom elements must not disappear at the renderer boundary.
const tags = new Set(
  'a abbr article aside audio b bdi bdo blockquote br button caption cite code col colgroup dd del details dfn div dl dt em figcaption figure footer h1 h2 h3 h4 h5 h6 header hr i iframe img input kbd li main mark nav ol p picture pre q rp rt ruby s samp section small source span strong sub summary sup table tbody td th thead time tr track u ul var video style'.split(
    ' ',
  ),
);

async function files(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(async (entry) => {
          const filename = path.join(directory, entry.name);
          return entry.isDirectory() ? files(filename) : /\.mdx?$/.test(filename) ? [filename] : [];
        }),
    )
  ).flat();
}

/** Compile plain Markdown and directives only. No module evaluation or JSX compiler. */
export async function compileContent({
  production,
}: {
  production: boolean;
}): Promise<{ posts: ContentPage[]; pages: ContentPage[] }> {
  const result: { posts: ContentPage[]; pages: ContentPage[] } = { posts: [], pages: [] };
  const markdownBodies: Record<string, string> = {};
  await mkdir('public/generated', { recursive: true });
  const image = async (url: string, filename: string) => {
    if (/^https?:\/\//.test(url)) return { src: url };
    const source = url.startsWith('/')
      ? path.resolve('public', url.slice(1))
      : path.resolve(path.dirname(filename), url);
    const bytes = await readFile(source);
    const metadata = await sharp(bytes).metadata();
    const name = `${createHash('sha256').update(bytes).digest('hex').slice(0, 20)}${path.extname(source)}`;
    await copyFile(source, path.join('public/generated', name));
    return { src: `/generated/${name}`, width: metadata.width, height: metadata.height };
  };
  for (const [collection, directory] of [
    ['posts', 'src/content/post'],
    ['pages', 'src/pages'],
  ] as const) {
    const filenames =
      collection === 'pages'
        ? (await files(directory)).filter((file) => path.dirname(file) === directory)
        : await files(directory);
    for (const filename of filenames) {
      try {
        const source = matter(await readFile(filename, 'utf8'));
        const data = (collection === 'posts' ? postSchema : pageSchema).parse(source.data);
        if (production && data.draft) continue;
        const id = contentId(path.relative(directory, filename), source.data);
        if (collection === 'posts') markdownBodies[id] = source.content.trim();
        if (result[collection].some((page) => page.id === id))
          throw new Error(`Duplicate ID: ${id}`);
        let calloutIndex = 0;
        const calloutIds = new Set<string>();
        const directives = () => (tree: MarkdownRoot) => {
          const walk = (node: MarkdownRoot | MarkdownNode) => {
            // Colons in ordinary prose (1:1, :package:) are not component invocations.
            if (node.type === 'textDirective') {
              Object.assign(node, {
                type: 'text',
                value: source.content.slice(node.position?.start.offset, node.position?.end.offset),
                children: undefined,
              });
              return;
            }
            if (node.type === 'containerDirective' || node.type === 'leafDirective') {
              const attributes = node.attributes ?? {};
              if (kinds.has(node.name) && node.type === 'containerDirective') {
                const calloutId = attributes.id || `${id}-callout-${calloutIndex + 1}`;
                calloutIndex++;
                if (calloutIds.has(calloutId))
                  throw new Error(`Duplicate callout ID: ${calloutId}`);
                calloutIds.add(calloutId);
                for (const key of Object.keys(attributes)) {
                  if (!['id', 'title', 'collapsible', 'collapsed'].includes(key)) {
                    throw new Error(`Unsupported callout attribute: ${key}`);
                  }
                }
                node.data = {
                  hName: 'content-callout',
                  hProperties: {
                    kind: node.name,
                    id: calloutId,
                    title: attributes.title ?? undefined,
                    collapsible: attributes.collapsible ?? undefined,
                    collapsed: attributes.collapsed ?? undefined,
                  },
                };
              } else if (node.name === 'youtube' && node.type === 'leafDirective') {
                if (!/^[\w-]{11}$/.test(attributes.id ?? ''))
                  throw new Error('YouTube requires an 11-character video ID');
                node.data = {
                  hName: 'iframe',
                  hProperties: {
                    src: `https://www.youtube-nocookie.com/embed/${attributes.id}`,
                    title: attributes.title || 'YouTube video',
                    loading: 'lazy',
                    allowFullScreen: true,
                  },
                };
              } else throw new Error(`Unsupported directive: ${node.name}`);
            }
            if (
              node.type === 'html' &&
              (/<\/?[A-Z]|\{/.test(node.value) ||
                /\bon\w+\s*=|<(script|style|content-callout)\b/i.test(node.value))
            ) {
              throw new Error('Unsupported JSX or executable HTML');
            }
            if (node.type === 'html') {
              for (const match of node.value.matchAll(/<\/?([a-z][\w:-]*)\b/gi)) {
                if (!tags.has(match[1])) throw new Error(`Unsupported HTML tag: ${match[1]}`);
              }
            }
            if (
              filename.endsWith('.mdx') &&
              node.type === 'text' &&
              /^\{[\s\S]*\}$/.test(node.value.trim())
            ) {
              throw new Error('Unsupported JSX expression');
            }
            if (
              node.type === 'paragraph' &&
              node.children?.[0]?.type === 'text' &&
              /^(import|export)\s/.test(node.children[0].value)
            ) {
              throw new Error('Content module imports/exports are unsupported');
            }
            if ('children' in node) node.children.forEach(walk);
          };
          walk(tree);
        };
        const processor = unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkDirective)
          .use(directives)
          .use(remarkSmartypants)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeExpressiveCode, {
            ...expressiveCodeOptions,
            // Copy controls must not inject a JavaScript module into content.
            frames: { showCopyToClipboardButton: false },
            customCreateRenderer: async (options) => ({
              ...(await createRenderer(options)),
              jsModules: [],
            }),
          })
          .use(rehypeRaw)
          .use(rehypeSlug)
          .use(rehypeExternalLinks, {
            target: '_blank',
            rel: ['nofollow', 'noopener', 'noreferrer'],
          });
        // Raw HTML parsing preserves our directive wrapper without executing anything.
        const markdown = processor.parse(source.content);
        const minutesRead = readingTime(toString(markdown)).text;
        const tree = (await processor.run(markdown)) as Root;
        const headings: ContentPage['headings'] = [];
        const convert = async (node: RootContent): Promise<ContentNode[]> => {
          if (node.type === 'text') return [{ type: 'text', value: node.value }];
          if (node.type === 'comment') return [];
          if (node.type !== 'element') throw new Error(`Unsupported node: ${node.type}`);
          const element = node as Element;
          const children: ContentNode[] = [];
          for (const child of element.children) children.push(...(await convert(child)));
          if (element.tagName === 'content-callout') {
            const props = element.properties;
            const kind = String(props.kind) as Extract<ContentNode, { type: 'callout' }>['kind'];
            return [
              {
                type: 'callout',
                id: String(props.id),
                kind,
                title: String(props.title || kind[0].toUpperCase() + kind.slice(1)),
                collapsible: props.collapsible !== undefined && props.collapsible !== 'false',
                collapsed: props.collapsed !== undefined && props.collapsed !== 'false',
                children,
              },
            ];
          }
          if (!tags.has(element.tagName))
            throw new Error(`Unsupported HTML tag: ${element.tagName}`);
          const attributes: Record<string, string> = {};
          for (const [key, value] of Object.entries(element.properties)) {
            if (/^on/i.test(key) || key === 'srcDoc') throw new Error(`Unsafe attribute: ${key}`);
            const name =
              key === 'className'
                ? 'class'
                : key === 'htmlFor'
                  ? 'for'
                  : /^(aria|data)[A-Z]/.test(key)
                    ? key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
                    : key.toLowerCase();
            if (value !== false && value != null)
              attributes[name] = Array.isArray(value)
                ? value.join(' ')
                : value === true
                  ? ''
                  : String(value);
            if (
              ['href', 'src', 'poster', 'action', 'xlink:href'].includes(name) &&
              /^(javascript|vbscript|data):/i.test(
                Array.from(String(value))
                  .filter((character) => character.charCodeAt(0) > 32)
                  .join(''),
              )
            )
              throw new Error(`Unsafe URL: ${name}`);
          }
          if (
            element.tagName === 'iframe' &&
            !/^https:\/\/www.youtube-nocookie.com\/embed\/[\w-]{11}$/.test(attributes.src ?? '')
          )
            throw new Error('Unsupported iframe source');
          if (element.tagName === 'img') {
            const asset = await image(attributes.src, filename);
            attributes.src = asset.src;
            if (asset.width) attributes.width = String(asset.width);
            if (asset.height) attributes.height = String(asset.height);
            attributes.loading = 'lazy';
          }
          if (/^h[1-6]$/.test(element.tagName))
            headings.push({
              depth: Number(element.tagName[1]),
              slug: attributes.id,
              text: toText(element),
            });
          return [
            {
              type: 'element',
              tag: element.tagName as Extract<ContentNode, { type: 'element' }>['tag'],
              attributes,
              children,
            },
          ];
        };
        const body: ContentNode[] = [];
        for (const child of tree.children) body.push(...(await convert(child)));
        const cover = data.coverImage ? await image(data.coverImage.src, filename) : undefined;
        if (cover && (!cover.width || !cover.height))
          throw new Error('Cover images must be local images with dimensions');
        result[collection].push({
          ...data,
          id,
          body,
          headings,
          publishDate: data.publishDate?.toISOString(),
          updatedDate: data.updatedDate?.toISOString(),
          author: typeof data.author === 'string' ? [data.author] : (data.author ?? []),
          coverImage: cover
            ? {
                src: cover.src,
                alt: data.coverImage!.alt,
                width: cover.width!,
                height: cover.height!,
              }
            : undefined,
          readingTime: minutesRead,
        });
      } catch (error) {
        throw new Error(`${filename}: ${error instanceof Error ? error.message : error}`, {
          cause: error,
        });
      }
    }
  }
  await mkdir('src/generated', { recursive: true });
  await writeFile('src/generated/content.json', `${JSON.stringify(result, null, 2)}\n`);
  await writeFile('src/generated/markdown.json', `${JSON.stringify(markdownBodies)}\n`);
  return result;
}

if (process.argv[1] && /[/\\]compile-content\.(ts|js)$/.test(process.argv[1])) {
  compileContent({ production: process.argv.includes('--production') })
    .then((result) => {
      console.log(`Compiled ${result.posts.length} posts and ${result.pages.length} pages`);
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}
