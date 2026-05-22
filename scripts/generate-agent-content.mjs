import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const site = 'https://edmundmiller.dev';
const dist = 'dist';
const postsDir = 'src/content/post';

const ensureWrite = async (path, content) => {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
};

const stripFrontmatter = (text) => text.replace(/^---\n[\s\S]*?\n---\n?/, '').trim();
const frontmatter = (text) => {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  return Object.fromEntries(
    match[1]
      .split('\n')
      .map((line) => line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/))
      .filter(Boolean)
      .map(([, key, value]) => [key, value.replace(/^['"]|['"]$/g, '')])
  );
};
const slugFrom = (name) => name.replace(/\.(md|mdx)$/, '');

async function postFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await readdir(path);
      const index = nested.find((name) => /^index\.mdx?$/.test(name));
      if (index) files.push({ slug: entry.name, path: join(path, index) });
    } else if (/\.mdx?$/.test(entry.name)) {
      files.push({ slug: slugFrom(entry.name), path });
    }
  }
  return files;
}

const posts = [];
for (const file of await postFiles(postsDir)) {
  const raw = await readFile(file.path, 'utf8');
  const data = frontmatter(raw);
  if (data.draft === 'true') continue;
  posts.push({ ...file, ...data, body: stripFrontmatter(raw) });
}
posts.sort((a, b) => new Date(b.updatedDate || b.publishDate) - new Date(a.updatedDate || a.publishDate));

const intro = `# Edmund Miller\n\nBioinformatics, biology, genomics, and software engineering notes from Edmund Miller.\n`;
const links = [
  '- [Home](/index.md)',
  '- [About](/about/index.md)',
  '- [Posts](/posts/index.md)',
  '- [RSS](/rss.xml)',
  '- [Sitemap](/sitemap-index.xml)',
];
const postLinks = posts.map((post) => `- [${post.title || post.slug}](/posts/${post.slug}/index.md): ${post.description || ''}`);

await ensureWrite(join(dist, 'llms.txt'), `${intro}\n## Site\n${links.join('\n')}\n\n## Posts\n${postLinks.join('\n')}\n`);
await ensureWrite(join(dist, 'index.md'), `${intro}\n## Recent posts\n${postLinks.slice(0, 10).join('\n')}\n`);
await ensureWrite(join(dist, 'about', 'index.md'), `# About Edmund Miller\n\nEdmund Miller is a bioinformatics and functional genomics researcher who writes about reproducible workflows, genomics, and software.\n`);
await ensureWrite(join(dist, 'posts', 'index.md'), `# Posts\n\n${postLinks.join('\n')}\n`);

let full = `${intro}\n## Posts\n`;
for (const post of posts) {
  const content = `# ${post.title || post.slug}\n\n${post.description ? `${post.description}\n\n` : ''}${post.body}\n`;
  await ensureWrite(join(dist, 'posts', post.slug, 'index.md'), content);
  full += `\n---\n\n${content}`;
}
await ensureWrite(join(dist, 'llms-full.txt'), full);
