import { expect, test } from '@playwright/test';
import sharp from 'sharp';

test('published articles remain discoverable through feeds, Markdown, and social metadata', async ({
  page,
  request,
}) => {
  const rss = await request.get('/rss.xml');
  const sitemap = await request.get('/sitemap-0.xml');
  expect(rss.ok()).toBe(true);
  expect(sitemap.ok()).toBe(true);
  const parsed = await page.evaluate(
    ([feed, map]) => {
      const parser = new DOMParser();
      const feedDocument = parser.parseFromString(feed, 'application/xml');
      const mapDocument = parser.parseFromString(map, 'application/xml');
      return {
        invalid:
          !!feedDocument.querySelector('parsererror') || !!mapDocument.querySelector('parsererror'),
        posts: [...feedDocument.querySelectorAll('item')].map((item) => ({
          url: item.querySelector('link')!.textContent!,
          title: item.querySelector('title')!.textContent!,
        })),
        urls: [...mapDocument.querySelectorAll('loc')].map((node) => node.textContent),
      };
    },
    [await rss.text(), await sitemap.text()],
  );
  expect(parsed.invalid).toBe(false);
  expect(parsed.posts.length).toBeGreaterThan(0);
  for (const post of parsed.posts) expect(parsed.urls).toContain(post.url);
  expect(parsed.urls).not.toContain('https://edmundmiller.dev/404.html');
  expect(parsed.posts.some((post) => post.url.endsWith('/posts/emacs-mdx/'))).toBe(false);

  const post = parsed.posts.find((item) => item.url.endsWith('/posts/emacs-nextflow/'))!;
  expect(post).toBeDefined();
  const pathname = new URL(post.url).pathname;
  await page.route('**/count.js', (route) => route.abort());
  await page.goto(pathname);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(post.title);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', post.url);
  const markdown = await request.get(`${pathname}index.md`);
  expect(markdown.ok()).toBe(true);
  expect(await markdown.text()).toContain(`# ${post.title}`);
  const imageUrl = await page.locator('meta[property="og:image"]').getAttribute('content');
  const image = await request.get(new URL(imageUrl!).pathname);
  expect(image.ok()).toBe(true);
  expect(await sharp(await image.body()).metadata()).toMatchObject({
    format: 'png',
    width: 1200,
    height: 630,
  });
});
