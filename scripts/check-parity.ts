import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { chromium, type Page } from '@playwright/test';

const { values } = parseArgs({
  options: {
    baseline: { type: 'string' },
    current: { type: 'string', default: 'dist' },
    report: { type: 'string' },
    json: { type: 'boolean' },
    help: { type: 'boolean' },
  },
});
if (values.help || !values.baseline) {
  console.log(
    'Usage: pnpm test:parity --baseline <old dist directory> [--current dist] [--report results.json] [--json]',
  );
  console.log(
    'Build both revisions first. Compares static content and links without executing page scripts.',
  );
  process.exit(values.help ? 0 : 2);
}

async function htmlFiles(directory: string, prefix = ''): Promise<string[]> {
  const entries = await readdir(path.join(directory, prefix), { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const name = path.join(prefix, entry.name);
      return entry.isDirectory()
        ? htmlFiles(directory, name)
        : name.endsWith('.html')
          ? [name]
          : [];
    }),
  );
  return files.flat().sort();
}

const routeFor = (file: string) =>
  file === 'index.html' ? '/' : `/${file.replace(/index\.html$/, '')}`;

async function snapshot(page: Page, route = '/') {
  return page.evaluate((pathname) => {
    const text = (element: Element | null): string => {
      if (!element) return '';
      const clone = element.cloneNode(true) as Element;
      clone
        .querySelectorAll('script,style,svg,astro-icon,button,noscript,lite-youtube')
        .forEach((node) => node.remove());
      // Browsers separate block elements visually even when HTML omits whitespace.
      clone
        .querySelectorAll('p,div,li,ul,ol,h1,h2,h3,h4,h5,h6,table,tr,td,th,pre,figure,blockquote')
        .forEach((node) => node.append(' '));
      return (clone.textContent ?? '').replace(/\s+/g, ' ').trim();
    };
    const href = (value: string) => {
      const url = new URL(value, new URL(pathname, 'https://edmundmiller.dev'));
      // Trailing slash differences are audited separately at the Worker boundary.
      if (url.origin === 'https://edmundmiller.dev')
        return `${url.pathname.replace(/\/$/, '') || '/'}${url.search}${url.hash}`;
      return url.href;
    };
    const main = document.querySelector('main');
    if (!main) throw new Error('Missing main landmark');
    const prose = main.querySelector('.e-content') ?? main;
    const headings = [...main.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((node) => ({
      level: node.tagName,
      id: node.id,
      text: text(node),
    }));
    // Compare prose independently of loose/tight list paragraph wrappers.
    const proseText = text(prose);
    const lists = [...prose.querySelectorAll('ul,ol')].map((node) => ({
      tag: node.tagName,
      items: [...node.children].map(text),
    }));
    const links = [...main.querySelectorAll('a[href]')].map((node) => ({
      href: href(node.getAttribute('href')!),
      text: text(node),
    }));
    const code = [...main.querySelectorAll('pre')].map((node) => {
      const lines = [...node.querySelectorAll('.ec-line')];
      return {
        text: (lines.length
          ? lines.map((line) => line.textContent).join('\n')
          : (node.textContent ?? '')
        ).trimEnd(),
        title: text(node.closest('figure')?.querySelector('figcaption') ?? null),
        highlighted: [...node.querySelectorAll('.ec-line.highlight')].map(
          (line) => line.textContent,
        ),
      };
    });
    const images = [...main.querySelectorAll('img')].map((node) => ({
      alt: node.alt,
      // Local optimization hashes differ between builds; missing image requests are checked below.
      source: /^https?:/.test(node.getAttribute('src') ?? '') ? node.src : 'local',
    }));
    const videos = [
      ...new Set(
        [
          ...[...main.querySelectorAll('lite-youtube')].map((node) => node.getAttribute('videoid')),
          ...[...main.querySelectorAll('iframe')].map(
            (node) => node.src.match(/\/embed\/([^?]+)/)?.[1],
          ),
        ].filter(Boolean),
      ),
    ];
    const callouts = [...main.querySelectorAll('[data-type]')].map((node) => {
      const body = node.firstElementChild?.children[1];
      const title = body?.firstElementChild;
      return {
        kind: node.getAttribute('data-type'),
        title: title?.textContent?.trim(),
        collapsible: title?.tagName === 'BUTTON',
      };
    });
    return {
      headings,
      proseText,
      lists,
      links,
      code,
      images,
      videos,
      callouts,
      ids: [...document.querySelectorAll('[id]')].map((node) => node.id),
      localImages: [...main.querySelectorAll('img[src]')]
        .map((node) => href(node.getAttribute('src')!))
        .filter((src) => src.startsWith('/')),
    };
  }, route);
}
type Snapshot = Awaited<ReturnType<typeof snapshot>>;
const fields = [
  'headings',
  'proseText',
  'lists',
  'links',
  'code',
  'images',
  'videos',
  'callouts',
] as const;
function differences(before: Snapshot, after: Snapshot) {
  return fields.flatMap((field) => {
    if (JSON.stringify(before[field]) === JSON.stringify(after[field])) return [];
    return [{ field, before: before[field], after: after[field] }];
  });
}

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
});
try {
  const context = await browser.newContext({ javaScriptEnabled: false });
  await context.route('**/*', (route) => route.abort());
  const page = await context.newPage();
  const collect = async (directory: string) => {
    const pages = new Map<string, Snapshot>();
    for (const file of await htmlFiles(directory)) {
      await page.setContent(await readFile(path.join(directory, file), 'utf8'), {
        waitUntil: 'domcontentloaded',
      });
      pages.set(routeFor(file), await snapshot(page, routeFor(file)));
    }
    return pages;
  };
  const before = await collect(values.baseline);
  const after = await collect(values.current);
  const regressions = [];
  for (const [route, original] of before) {
    const current = after.get(route);
    if (!current)
      regressions.push({ route, differences: [{ field: 'route', before: true, after: false }] });
    else {
      const changed = differences(original, current);
      if (changed.length) regressions.push({ route, differences: changed });
    }
  }
  for (const route of after.keys()) {
    if (!before.has(route))
      regressions.push({ route, differences: [{ field: 'route', before: false, after: true }] });
  }

  const broken = async (pages: Map<string, Snapshot>, directory: string) => {
    const result: string[] = [];
    for (const [route, value] of pages) {
      for (const link of value.links) {
        if (!link.href.startsWith('/')) continue;
        const url = new URL(link.href, 'https://edmundmiller.dev');
        const pathname = decodeURIComponent(url.pathname);
        const target = pages.get(
          pathname.endsWith('/') || pathname.endsWith('.html') ? pathname : `${pathname}/`,
        );
        if (target) {
          if (url.hash && !target.ids.includes(decodeURIComponent(url.hash.slice(1))))
            result.push(`${route} → ${link.href} (missing anchor)`);
        } else {
          try {
            await readFile(path.join(directory, pathname));
          } catch {
            result.push(`${route} → ${link.href} (missing target)`);
          }
        }
      }
      for (const image of value.localImages) {
        try {
          await readFile(path.join(directory, decodeURIComponent(image.split('?')[0])));
        } catch {
          result.push(`${route} → ${image} (missing image)`);
        }
      }
    }
    return [...new Set(result)].sort();
  };
  const brokenBefore = await broken(before, values.baseline);
  const brokenAfter = await broken(after, values.current);
  const newBrokenLinks = brokenAfter.filter((link) => !brokenBefore.includes(link));

  // Mutate real parsed HTML, not extracted data: prove both extraction and comparison detect loss.
  const controls: Record<string, boolean> = {};
  for (const [name, selector, field] of [
    ['removedParagraph', 'main p', 'proseText'],
    ['removedLink', 'main a[href]', 'links'],
  ] as const) {
    await page.setContent(await readFile(path.join(values.current, 'index.html'), 'utf8'), {
      waitUntil: 'domcontentloaded',
    });
    const original = await snapshot(page);
    await page
      .locator(selector)
      .first()
      .evaluate((node) => node.remove());
    controls[name] = differences(original, await snapshot(page)).some(
      (change) => change.field === field,
    );
  }
  const report = {
    baseline: path.resolve(values.baseline),
    current: path.resolve(values.current),
    pagesBefore: before.size,
    pagesAfter: after.size,
    totals: Object.fromEntries(
      (['headings', 'links', 'code', 'images', 'videos', 'callouts'] as const).map((field) => [
        field,
        {
          before: [...before.values()].reduce((total, value) => total + value[field].length, 0),
          after: [...after.values()].reduce((total, value) => total + value[field].length, 0),
        },
      ]),
    ),
    controls,
    differences: regressions,
    brokenBefore,
    brokenAfter,
    newBrokenLinks,
  };
  if (values.report) await writeFile(values.report, `${JSON.stringify(report, null, 2)}\n`);
  if (values.json) console.log(JSON.stringify(report));
  else {
    console.log(`Compared ${before.size} baseline and ${after.size} current HTML pages.`);
    console.log(`Mutation controls: ${JSON.stringify(controls)}`);
    for (const entry of regressions)
      console.log(`${entry.route}: ${entry.differences.map((item) => item.field).join(', ')}`);
    console.log(
      `Changed pages: ${regressions.length}; new broken links/images: ${newBrokenLinks.length}; baseline broken: ${brokenBefore.length}.`,
    );
  }
  if (
    regressions.length ||
    newBrokenLinks.length ||
    Object.values(controls).some((passed) => !passed)
  )
    process.exitCode = 1;
} finally {
  await browser.close();
}
