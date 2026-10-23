# Edmund Miller's personal site

A [Foldkit](https://foldkit.dev/) application, prerendered with Vite and served by a Cloudflare
Worker. Foldkit owns every page and interactive state. No Astro, React, JSX runtime, or component
islands remain. The Cactus visual design and existing public URLs are retained.

## Development

```bash
mise trust
mise run setup
pnpm dev
```

`pnpm build` compiles content, prerenders every route into `dist/`, generates RSS, sitemaps, social
images and agent-readable Markdown, then builds Pagefind's index. `pnpm preview` serves the result.
Search needs a production build. Development includes drafts; production excludes them.

## One application, explicit state

- `src/app/model.ts`: schema-backed Model/Messages, pure update, Effect Commands and Subscriptions.
  Routing, theme, search query/results/tag filter, callouts, code-copy feedback, and chart selection
  are visible here. Browser APIs run in Commands, not the view.
- `src/app/route.ts`: typed routes and URL parsing. Internal page links use Foldkit navigation;
  assets and feeds use document loads. Fragment links scroll to their target.
- `src/app/view.ts` and `pages.ts`: shell and page views, shared by server rendering and hydration.
- `src/app/widgets.ts`: native Foldkit chart and logo. Canvas drawing uses scoped Mount resources;
  cleanup cancels frames and disconnects observers. No independent application roots.
- `src/entry.server.ts`: prerendering and document head. `metadata.ts` keeps rich SEO metadata
  synchronized on client navigation. `src/app/entry.ts` hydrates the server-rendered application.
- `vite.config.ts`: Foldkit's official Vite integration pairs server/client builds and build IDs.

To add behavior, add a Message, handle it in update, and render from Model. Use Commands for
one-shot effects, Subscriptions for events, and Mount for resources tied to a DOM node's lifetime.
Keep init deterministic: the server does not execute browser effects.

## Content is data

`scripts/compile-content.ts` parses Markdown into `ContentNode` data rendered by Foldkit. It supports
GFM, footnotes, reference links, trusted static HTML, highlighted code, local images, nested
callouts and YouTube directives. Frontmatter and slug rules live in `src/content.config.ts`.

Posts remain in `src/content/post/`; standalone prose is in `src/pages/*.mdx`. Legacy `.mdx`
extensions are accepted as Markdown, **not executable MDX**. Imports, JSX and scripts fail the
build. See `src/content/AGENTS.md` for directive syntax. The custom compiler retains content features
that `@foldkit/markdown` does not yet support.

`src/generated/`, `public/generated/`, `.output/` and `dist/` are ignored build output. Never edit
them. HTML, feeds and agent exports all consume the same validated production collection. The
current application bundles its compiled content eagerly for synchronous navigation; split loading
only if the site's growth justifies an asynchronous page state.

## Verification

```bash
pnpm format:check
pnpm lint
pnpm lint:stylex
pnpm check
pnpm test:content
pnpm test:app
pnpm build
pnpm exec playwright install chromium # once per machine
pnpm test:site
```

To reuse an installed Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. `mise run test` also
runs prose-rule and closeout-hook tests. `DESIGN.md` and `docs/stylex.md` govern styling.

`test:app` runs [Foldkit Story and Scene](https://foldkit.dev/testing) tests colocated in
`src/app/`. Story checks state transitions and Command arguments; Scene drives the real search
and shell views, including menus, callouts, and state across route changes. Neither executes
Command Effects or starts a browser. Vitest compiles real StyleX styles and enables the
production search branch.

Keep browser-only contracts in `test:site`: hydration, focus, keyboard subscriptions, history,
theme persistence, clipboard, actual Pagefind loading/filtering, and published RSS/sitemap/Markdown/OG
outputs. Put compiler contracts such as footnote accessibility in `test:content`. Prefer extending
these journeys over adding a test per handler. Performance comparisons, full cross-browser checks,
and Worker parity remain on-demand audits, not duplicated per-change test matrices.

For a migration audit, build the comparison revision in a separate checkout, then compare its
output with the current production build:

```bash
pnpm test:parity --baseline /path/to/baseline/dist --report /tmp/parity.json
```

This checks every HTML route's prose, headings, ordered lists and links, code text and markers,
images, video IDs, and callouts. It also checks internal links, anchors, and local image files.
Removing a paragraph and link from parsed HTML must trigger its built-in mutation controls.
`--json` emits machine-readable results; `--current` selects a different current build directory.
Exit 1 means differences need review, including intentional changes; there is no silent allowlist.
Exit 0 proves only these static contracts, not browser interactions, Worker behavior, accessibility,
image equivalence, or performance. Keep `test:site` and the before/after browser audit alongside it.
Node 24 runs this script directly so browser callbacks are not rewritten by a TypeScript bundler.

Foldkit `0.169.0` and `@foldkit/vite-plugin` `0.28.0` are pinned. SSR is experimental; consult the
[matching source](https://github.com/foldkit/foldkit/tree/foldkit%400.169.0) and
[AI overview](https://foldkit.dev/ai/overview) before upgrading, and rerun hydration tests.

## Deployment

`pnpm deploy` builds and deploys with Wrangler; publishing requires authorization. The existing
Worker retains Markdown content negotiation and agent-discovery headers. Cloudflare serves the
prerendered HTML, including `404.html`, from `dist/`.

The design derives from [Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus),
inspired by [Hexo Theme Cactus](https://github.com/probberechts/hexo-theme-cactus). MIT license.
