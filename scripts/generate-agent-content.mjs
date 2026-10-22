import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const dist = 'dist';

const ensureWrite = async (path, content) => {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
};

const collection = JSON.parse(await readFile('src/generated/content.json', 'utf8'));
const bodies = JSON.parse(await readFile('src/generated/markdown.json', 'utf8'));
const posts = collection.posts
  .filter((post) => !post.draft)
  .map((post) => ({
    title: post.title,
    description: post.description,
    publishDate: post.publishDate,
    updatedDate: post.updatedDate,
    slug: post.id,
    body: bodies[post.id],
  }));
posts.sort(
  (a, b) => new Date(b.updatedDate || b.publishDate) - new Date(a.updatedDate || a.publishDate),
);

const intro = `# Edmund Miller\n\nBioinformatics, biology, genomics, and software engineering notes from Edmund Miller.\n`;
const links = [
  '- [Home](/index.md)',
  '- [About](/about/index.md)',
  '- [Posts](/posts/index.md)',
  '- [RSS](/rss.xml)',
  '- [Sitemap](/sitemap-index.xml)',
];
const postLinks = posts.map(
  (post) =>
    `- [${post.title || post.slug}](/posts/${post.slug}/index.md): ${post.description || ''}`,
);

await ensureWrite(
  join(dist, 'llms.txt'),
  `${intro}\n## Site\n${links.join('\n')}\n\n## Posts\n${postLinks.join('\n')}\n`,
);
await ensureWrite(
  join(dist, 'index.md'),
  `${intro}\n## Recent posts\n${postLinks.slice(0, 10).join('\n')}\n`,
);
await ensureWrite(
  join(dist, 'about', 'index.md'),
  `# About Edmund Miller\n\nEdmund Miller is a bioinformatics and functional genomics researcher who writes about reproducible workflows, genomics, and software.\n`,
);
await ensureWrite(join(dist, 'posts', 'index.md'), `# Posts\n\n${postLinks.join('\n')}\n`);

let full = `${intro}\n## Posts\n`;
for (const post of posts) {
  const content = `# ${post.title || post.slug}\n\n${post.description ? `${post.description}\n\n` : ''}${post.body}\n`;
  await ensureWrite(join(dist, 'posts', post.slug, 'index.md'), content);
  full += `\n---\n\n${content}`;
}
await ensureWrite(join(dist, 'llms-full.txt'), full);
