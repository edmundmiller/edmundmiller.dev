import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { siteConfig } from '../src/site.config';
import type { ContentPage } from '../src/content/types';

const { posts } = JSON.parse(await readFile('src/generated/content.json', 'utf8')) as {
  posts: ContentPage[];
};
const manifest = JSON.parse(await readFile('.output/server/foldkit.build.json', 'utf8')) as {
  prerendered: string[];
};
const origin = 'https://edmundmiller.dev';
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      })[char]!,
  );
async function write(path: string, body: string | Uint8Array) {
  await mkdir(dirname(join('dist', path)), { recursive: true });
  await writeFile(join('dist', path), body);
}

// Foldkit prerenders directories; Cloudflare's static 404 contract is a file.
await rename('dist/404.html/index.html', 'dist/404.generated.html');
await rm('dist/404.html', { recursive: true });
await rename('dist/404.generated.html', 'dist/404.html');

await write(
  'rss.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>${escape(siteConfig.title)}</title><description>${escape(siteConfig.description)}</description><link>${origin}/</link>${posts
    .map(
      (post) => `
<item><title>${escape(post.title)}</title><description>${escape(post.description)}</description><link>${origin}/posts/${post.id}/</link><guid isPermaLink="true">${origin}/posts/${post.id}/</guid><pubDate>${new Date(post.publishDate!).toUTCString()}</pubDate></item>`,
    )
    .join('')}
</channel></rss>`,
);
const paths = manifest.prerendered.filter(
  (path) => !['/404.html', '/places/', '/admonitions-demo/'].includes(path),
);
await write(
  'sitemap-0.xml',
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${escape(origin + path)}</loc></url>`).join('')}</urlset>`,
);
await write(
  'sitemap-index.xml',
  `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${origin}/sitemap-0.xml</loc></sitemap></sitemapindex>`,
);

for (const post of posts.filter((entry) => !entry.ogImage)) {
  const lines: string[] = [''];
  for (const word of post.title.split(/\s+/)) {
    const last = lines.length - 1;
    if (lines[last]!.length + word.length > 29) lines.push(word);
    else lines[last] += `${lines[last] ? ' ' : ''}${word}`;
  }
  const date = new Date(post.updatedDate ?? post.publishDate!).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#1d1f21"/>
<g font-family="Roboto Mono" fill="#c9cacc"><text x="40" y="95" font-size="24">${escape(date)}</text>
<text fill="white" font-size="60" font-weight="700">${lines.map((line, i) => `<tspan x="40" y="${180 + i * 75}">${escape(line)}</tspan>`).join('')}</text>
<path d="M0 510H1200" stroke="#2bbc89"/>
<text x="40" y="580" font-size="28" font-weight="700">λ ${escape(siteConfig.title)}</text>
<text x="1160" y="580" text-anchor="end" font-size="24">by ${escape(siteConfig.author)}</text></g></svg>`;
  await write(
    `og-image/${post.id}.png`,
    new Resvg(svg, {
      font: {
        fontFiles: ['src/assets/roboto-mono-regular.ttf', 'src/assets/roboto-mono-700.ttf'],
        loadSystemFonts: false,
      },
    })
      .render()
      .asPng(),
  );
}
console.log(
  `Generated RSS (${posts.length} posts), sitemap (${paths.length} URLs), OG images, and 404.html.`,
);
