import { expect, test } from '@playwright/test';

test('hydration preserves articles and widget state through shell interactions', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('**/count.js', (route) => route.abort());
  let releaseScripts = () => {};
  const scriptsReady = new Promise<void>((resolve) => {
    releaseScripts = resolve;
  });
  await page.route('**/assets/*.js', async (route) => {
    await scriptsReady;
    await route.continue();
  });
  await page.goto('/posts/seqera-containers-part-1/', { waitUntil: 'commit' });
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toHaveText('Migration from Biocontainers to Seqera Containers: Part 1');
  const originalHeading = await heading.elementHandle();
  const originalCanvas = await page.locator('.site-dna-logo canvas').elementHandle();
  releaseScripts();
  const theme = page.getByRole('switch', { name: 'Dark theme' });
  await expect(theme).toBeEnabled();
  expect(await originalHeading?.evaluate((element) => element.isConnected)).toBe(true);
  expect(await originalCanvas?.evaluate((element) => element.isConnected)).toBe(true);

  const callout = page.getByRole('button', { name: 'Timeline', exact: true });
  await expect(callout).toHaveAttribute('aria-expanded', 'true');
  await callout.click();
  await expect(callout).toHaveAttribute('aria-expanded', 'false');
  await theme.click();
  await expect(theme).toHaveAttribute('aria-checked', 'true');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(callout).toHaveAttribute('aria-expanded', 'false');
  expect(await originalHeading?.evaluate((element) => element.isConnected)).toBe(true);

  await page.keyboard.press('/');
  const dialog = page.getByRole('dialog', { name: 'Search' });
  const query = dialog.getByRole('searchbox', { name: 'Search', exact: true });
  await expect(query).toBeFocused();
  await query.fill('nextflow');
  const result = dialog.getByRole('link', { name: 'Nextflow Emacs Workflow', exact: true });
  await expect(result).toBeVisible();
  await dialog.getByRole('button', { name: 'Close', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Search', exact: true })).toBeFocused();
  await page.keyboard.press('/');
  await expect(query).toHaveValue('nextflow');
  await expect(query).toBeFocused();
  await query.press('/');
  await expect(query).toHaveValue('nextflow/');
  // Search is Foldkit state: both Escape and Close preserve the query.
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Search', exact: true })).toBeFocused();
  await page.keyboard.press('/');
  await expect(query).toHaveValue('nextflow/');
  await query.fill('nextflow');
  await result.click();
  await expect(page).toHaveURL(/\/posts\/emacs-nextflow\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nextflow Emacs Workflow');
  await expect(page.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://edmundmiller.dev/posts/emacs-nextflow/',
  );
  // Navigation patches this application rather than replacing the document.
  expect(await originalCanvas?.evaluate((element) => element.isConnected)).toBe(true);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    'Nextflow Emacs Workflow',
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Nextflow/);
  expect(errors).toEqual([]);
});

test('cross-page fragments and analytics use the committed destination', async ({ page }) => {
  const views: { path: string; title: string; event?: boolean }[] = [];
  await page.exposeFunction('recordPageView', (view: (typeof views)[number]) => {
    if (!view.event) views.push(view);
  });
  await page.route('**/count.js', (route) =>
    route.fulfill({
      contentType: 'application/javascript',
      body: 'window.goatcounter = { count: (view) => window.recordPageView(view) };',
    }),
  );
  await page.goto('/');
  await expect(page.getByRole('switch')).toBeEnabled();
  // Warm navigation and metadata modules before testing a different page's fragment.
  const navigation = page.getByRole('navigation', { name: 'Main menu' });
  await navigation.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('About Edmund Miller');
  await navigation.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Bioinformatics engineer');
  // A delayed browser frame must not let navigation effects outrun the DOM commit.
  await page.evaluate(() => {
    const schedule = window.requestAnimationFrame;
    window.requestAnimationFrame = (callback) =>
      schedule((time) => setTimeout(() => callback(time), 100));
  });
  const article = navigation.getByRole('link', { name: 'Blog', exact: true });
  await article.evaluate((link) => {
    link.setAttribute('href', '/posts/emacs-nextflow/#footnote-label');
  });
  await article.click();
  await expect(page.locator('#footnote-label')).toBeInViewport();
  await expect
    .poll(() => views.at(-1))
    .toEqual({
      path: '/posts/emacs-nextflow/',
      title: 'Nextflow Emacs Workflow | Edmund Miller',
    });
});

test('narrow navigation, history, and system theme remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const theme = page.getByRole('switch');
  await expect(theme).toBeEnabled();
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(theme).toHaveAttribute('aria-checked', 'true');
  await theme.click();
  await expect(theme).toHaveAttribute('aria-checked', 'false');
  await page.emulateMedia({ colorScheme: 'light' });
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(theme).toHaveAttribute('aria-checked', 'false');

  const menu = page.getByRole('button', { name: 'Open main menu' });
  await menu.click();
  await expect(page.getByRole('navigation', { name: 'Main menu' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page
    .getByRole('navigation', { name: 'Main menu' })
    .getByRole('link', { name: 'About' })
    .click();
  await expect(page).toHaveURL(/\/about\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('About Edmund Miller');
  await expect(theme).toHaveAttribute('aria-checked', 'false');
  await page.goBack();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Bioinformatics engineer');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('public pages contain readable content without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    for (const [path, title] of [
      ['/', 'Bioinformatics engineer working on Nextflow & nf-core'],
      [
        '/posts/seqera-containers-part-2/',
        'Migration from Biocontainers to Seqera Containers: Part 2',
      ],
      ['/speaking/', 'My Conference Talks'],
    ] as const) {
      await page.goto(`http://127.0.0.1:4323${path}`);
      await expect(page.getByRole('heading', { level: 1, name: title, exact: true })).toBeVisible();
      await expect(
        page
          .getByRole('navigation', { name: 'More on this site' })
          .getByRole('link', { name: 'Blog' }),
      ).toBeVisible();
    }
    const missing = await page.goto('http://127.0.0.1:4323/not-a-page/');
    expect(missing?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('404');
  } finally {
    await context.close();
  }
});

test('native chart, code copy, and fragment navigation', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  const chartStatus = page
    .getByRole('group', { name: 'Posts published by year' })
    .getByRole('status');
  await page.getByRole('img', { name: '2019: 3 posts' }).hover();
  await expect(chartStatus).toContainText('Posts 3');
  const year = page.getByRole('img', { name: '2024: 7 posts' });
  await year.focus();
  await expect(chartStatus).toContainText('Posts 7');
  await expect(year).toBeFocused();
  await page.getByRole('link', { name: 'Nextflow Emacs Workflow', exact: true }).click();
  const code = page.getByRole('button', { name: 'Copy code', exact: true }).nth(1);
  await code.click();
  await expect(code).toHaveText('Copied');
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe('(use-package! nextflow-mode\n  :config\n  (set-docsets! \'nextflow-mode "Groovy"))\n');
  const anchor = page.getByRole('link', { name: /^Scroll to section:/ }).first();
  const hash = await anchor.getAttribute('href');
  await anchor.click();
  await expect(page).toHaveURL(new RegExp(`${hash}$`));
  // A near-bottom fragment cannot align to the top without scrolling past the document.
  await expect(page.locator(hash!)).toBeInViewport();
  await page.getByRole('button', { name: 'Back to Top' }).click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});

test('search failures retry and stale results do not replace the latest query', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('switch')).toBeEnabled();
  await page.route('**/pagefind/pagefind.js', (route) => route.abort());
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  const query = page.getByRole('searchbox', { name: 'Search', exact: true });
  await query.fill('nextflow');
  await expect(page.getByRole('alert')).toContainText('Search could not load');
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await page.unroute('**/pagefind/pagefind.js');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(
    page.getByRole('dialog').getByRole('link', { name: 'Nextflow Emacs Workflow', exact: true }),
  ).toBeVisible();
  await page.getByLabel('Filter by tag').selectOption('nixos');
  await expect(
    page.getByRole('dialog').getByRole('link', { name: 'Nextflow Emacs Workflow', exact: true }),
  ).toHaveCount(0);
  await query.fill('next');
  await query.fill('nonexistent-search-xyz');
  await expect(page.getByRole('dialog').getByRole('status')).toHaveText(
    '0 results for nonexistent-search-xyz',
  );
});
