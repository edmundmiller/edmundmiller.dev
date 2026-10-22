import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { compileContent } from '../../scripts/compile-content';
import type { ContentNode } from '../../src/content/types';

function flatten(nodes: ContentNode[]): ContentNode[] {
  return nodes.flatMap((node) => [node, ...('children' in node ? flatten(node.children) : [])]);
}

test('public compiler contract', async (t) => {
  const cwd = process.cwd();
  const temporary = await mkdtemp(path.join(os.tmpdir(), 'content-compiler-'));
  process.chdir(temporary);
  const metadata = `---\ntitle: Fixture\ndescription: A sufficiently long description for the test fixture.\npublishDate: 2024-01-02\ntags: [Nextflow, nextflow, Test]\n`;
  try {
    await mkdir('src/content/post/nested', { recursive: true });
    await mkdir('src/pages', { recursive: true });
    await writeFile(
      'src/content/post/nested/pixel.svg',
      '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="8"></svg>',
    );
    const body = `
# Repeat

## Repeat

::::info{#stable title="Outer" collapsible="true" collapsed="true"}
Nested **content**.

:::note
Inner [reference][example].
:::
::::

Footnote.[^note]

[^note]: Preserved footnote.

[example]: https://example.com

[Internal](/about/) and [section](#repeat).

![Pixel](pixel.svg)

<div class="raw" data-testid="fixture">Raw <strong>HTML</strong>.</div>

::youtube{id="a1zDuOPkMSw" title="An accessible video"}

\`\`\`js title="Example" {2}
const answer = 42;
console.log(answer);
\`\`\`
`;
    await writeFile(
      'src/content/post/nested/index.mdx',
      `${metadata}coverImage: {src: pixel.svg, alt: Cover}\n---\n${body}`,
    );
    await writeFile(
      'src/content/post/draft.md',
      `${metadata}draft: true\nslug: explicit-slug\n---\nDraft.`,
    );
    await writeFile(
      'src/pages/about.mdx',
      '---\ntitle: About\ndescription: A sufficiently long description for this standalone page.\nrobots: noindex\n---\n# About',
    );
    const dev = await compileContent({ production: false });
    assert.equal(dev.posts.length, 2);
    assert.equal(dev.pages[0].id, 'about');
    assert.equal(dev.pages[0].robots, 'noindex');
    assert(dev.posts.some((page) => page.id === 'explicit-slug' && page.draft));
    const production = await compileContent({ production: true });
    const page = production.posts[0];
    assert.equal(production.posts.length, 1);
    assert.equal(page.id, 'nested');
    assert.equal(page.publishDate, '2024-01-02T00:00:00.000Z');
    assert.deepEqual(page.tags, ['nextflow', 'test']);
    assert.equal(page.readingTime, '1 min read');
    assert.deepEqual(
      page.headings.slice(0, 2).map((heading) => heading.slug),
      ['repeat', 'repeat-1'],
    );
    assert.deepEqual(page.headings, dev.posts.find((post) => post.id === 'nested')!.headings);
    const nodes = flatten(page.body);
    const outer = nodes.find((node) => node.type === 'callout' && node.id === 'stable');
    assert(outer?.type === 'callout');
    assert(outer.collapsed && outer.collapsible);
    assert.equal(outer.title, 'Outer');
    assert(outer.children.some((node) => node.type === 'callout' && node.kind === 'note'));
    const elements = nodes.filter((node) => node.type === 'element');
    const external = elements.find(
      (node) => node.tag === 'a' && node.attributes.href === 'https://example.com',
    );
    assert.equal(external?.attributes.target, '_blank');
    assert.deepEqual(external?.attributes.rel.split(' ').sort(), [
      'nofollow',
      'noopener',
      'noreferrer',
    ]);
    for (const href of ['/about/', '#repeat']) {
      const link = elements.find((node) => node.tag === 'a' && node.attributes.href === href);
      assert(link);
      assert.equal(link.attributes.target, undefined);
    }
    const text = (children: ContentNode[]) =>
      flatten(children)
        .filter((node) => node.type === 'text')
        .map((node) => node.value)
        .join('');
    const caption = elements.find((node) => node.tag === 'figcaption');
    assert(caption);
    assert.equal(text(caption.children), 'Example');
    assert.deepEqual(
      elements
        .filter((node) => node.attributes.class?.split(' ').includes('highlight'))
        .map((node) => text(node.children)),
      ['console.log(answer);'],
    );
    assert(elements.some((node) => node.attributes['data-footnote-ref'] !== undefined));
    assert(elements.some((node) => node.attributes['data-footnote-backref'] !== undefined));
    assert(elements.some((node) => node.attributes['data-testid'] === 'fixture'));
    assert(
      elements.some(
        (node) => node.tag === 'iframe' && node.attributes.title === 'An accessible video',
      ),
    );
    assert(elements.some((node) => node.tag === 'style'));
    assert(!elements.some((node) => node.tag === 'script'));
    assert(page.coverImage);
    assert(page.coverImage.src.startsWith('/generated/'));
    assert.equal(page.coverImage.width, 12);
    assert.equal(page.coverImage.height, 8);
    assert.equal((await readFile(`public${page.coverImage.src}`, 'utf8')).includes('<svg'), true);
    assert.deepEqual(
      JSON.parse(await readFile('src/generated/content.json', 'utf8')),
      JSON.parse(JSON.stringify(production)),
    );

    for (const invalid of [
      '<Widget />',
      '{frontmatter.title}',
      '<html><body>Hidden wrapper</body></html>',
      '<script>alert(1)</script>',
      '<object data="x"></object>',
      '<img src="x" onerror="alert(1)">',
      '[bad](javascript:alert)',
      ':::unknown\nContent\n:::',
      "import Thing from './thing';",
    ]) {
      await t.test(`rejects ${invalid}`, async () => {
        await writeFile('src/content/post/nested/index.mdx', `${metadata}---\n${invalid}`);
        await assert.rejects(
          compileContent({ production: true }),
          /src\/content\/post\/nested\/index.mdx:.*(Unsupported|unsupported|Unsafe)/,
        );
      });
    }
  } finally {
    process.chdir(cwd);
    await rm(temporary, { recursive: true, force: true });
  }
});
