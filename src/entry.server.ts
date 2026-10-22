import { Effect } from 'effect';
import { Server } from 'foldkit/experimental';
import { init } from './app/model';
import { view } from './app/view';
import { metadataTags, escapeHtml } from './app/metadata';

export { prerenderPaths } from './app/pages';

// Foldkit passes this same render result to its document renderer. Keep richer
// head metadata request-local, including posts with an external canonical URL.
const heads = new WeakMap<Server.RenderedApplication, string>();

export async function renderPage(request: Request): Promise<Server.EntryResult> {
  const application = await Effect.runPromise(
    Server.renderToString({ routing: {}, init, view }, { url: request.url }),
  );
  heads.set(
    application,
    Object.entries(metadataTags(new URL(request.url).pathname))
      .filter((entry): entry is [string, string] => entry[1] !== undefined)
      .map(
        ([key, value]) =>
          `<meta ${key.includes(':') ? 'property' : 'name'}="${key}" content="${escapeHtml(value)}">`,
      )
      .join('\n'),
  );
  return Server.Rendered(application);
}

export const renderDocument: Server.DocumentRenderer = (application, assets) =>
  Server.renderDocument(application, assets, {
    head: `${heads.get(application) ?? ''}
<meta name="generator" content="Foldkit">
<meta name="theme-color" content="">
<link href="/favicon.ico" rel="icon" sizes="any">
<link href="/icon.svg" rel="icon" type="image/svg+xml">
<link href="/apple-touch-icon.png" rel="apple-touch-icon">
<link href="/manifest.webmanifest" rel="manifest">
<link rel="preload" href="/fonts/geist-pixel/GeistPixel-Square.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/geist-pixel/GeistPixel-Grid.woff2" as="font" type="font/woff2" crossorigin>
<link href="/sitemap-index.xml" rel="sitemap">
<link href="/rss.xml" rel="alternate" title="Edmund Miller" type="application/rss+xml">
<link href="https://webmention.io/edmundmiller.dev/webmention" rel="webmention">
<script>(()=>{let t;try{t=localStorage.getItem('theme')}catch{}document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'})()</script>
<script data-goatcounter="https://emiller.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>`,
  });
