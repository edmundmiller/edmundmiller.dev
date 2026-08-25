---
purpose: Record the StyleX 0.19 compatibility spike and migration recommendation.
applies_to: The disposable spike/stylex-astro branch only.
entrypoint: Review the decision, measurements, and implementation findings below.
verification: Re-run the listed checks from the spike worktree at its recorded commit.
update_when: The StyleX integration, measurements, or migration decision changes.
---

# StyleX compatibility spike for Astro

## Decision

StyleX is compatible with Astro. Astro templates can call `stylex.props()` directly, retain server rendering, and use regular CSS for global and generated Markdown rules. There is no StyleX restriction that requires converting Astro components to React.

Do not use `unplugin-stylex` 0.6.3 for a full migration yet. Its Astro integration is substantially simpler than custom Vite wiring, but its development transform updates CSS by reloading the page instead of preserving state through HMR, and Vite warns that the plugin is not serve-compatible. The package also needs production-environment and TypeScript workarounds. Those integration defects—not StyleX's authoring model—fail the spike's decision rule.

If a full migration proceeds before those defects are fixed upstream, prefer the official `@stylexjs/unplugin` with the small Astro development loader proven by the first pass. Otherwise, plain scoped CSS remains the lower-maintenance Tailwind replacement.

| Requirement                                                  | Result                                                                                                         |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Astro components stay Astro-native                           | Pass: `Header.astro` calls `stylex.props()` directly and gains no hydration                                    |
| Development and production compile without framework patches | Fail: production passes, but development reloads the page and emits a Vite compatibility warning               |
| Regular CSS can replace Tailwind Typography                  | Partial: responsibilities and a prototype are present; complete article parity has not been wired and verified |
| Visual and accessibility parity                              | Pass for the migrated surfaces and tested pages                                                                |
| Production size limits                                       | Pass: gzip CSS decreased 1,355 bytes and gzip JavaScript decreased 4,243 bytes                                 |
| Tailwind removal is demonstrated                             | Not yet: global/preflight, Typography, utility strings, PostCSS, and `tailwind-merge` remain                   |

## Astro integration findings

- `unplugin-stylex/astro` owns both development loading and production extraction. It removes the custom virtual-CSS/runtime tags and `cssInjectionTarget` used with the official Vite plugin.
- Astro passes `stylex.props()` spreads through as `class` attributes, so the first pass's `{ className }` to `{ class }` adapter is unnecessary. `stylex.defaultMarker()` is the exception: a call in an Astro template remains uncompiled, so the marker is precompiled in the colocated TypeScript module.
- The package's integration type declares `injectScript.stage` as a generic string rather than Astro's `InjectedScriptStage`; the config needs a documented `as AstroIntegration` cast.
- Production on Astro 7.1.0 parsed a queried TSX module as non-JSX. Astro 7.2.2 with `@astrojs/react` 6.0.2 fixes that build failure.
- The package treats a build as development unless both `NODE_ENV` and `BABEL_ENV` equal `production`. The build script sets both; without them, production output contains debug class names and source paths.
- Development style edits took effect, but both the Astro Header and React Tooltip triggered a full reload and lost a window sentinel. Vite logged `[plugin:unplugin-stylex] context method emitFile() is not supported in serve mode. This plugin is likely not vite-compatible.` Integration order did not change the result.
- Production emits a separate 6,294-byte raw (1,789-byte gzip) `stylex.css`. Each page receives a 253-byte inline script that appends its stylesheet link. This adds no component hydration but does add inline-script/CSP and per-page HTML considerations.

The Header exercises responsive rules, pseudo-states, shared theme variables, and ancestor-driven mobile-menu state. The Tooltip continues to use `stylex.create()` and conditional `stylex.props()` directly while preserving its public types, Motion behavior, and data-driven inline positioning.

## Global and prose CSS inventory

Tailwind preflight currently owns the reset plus global element, form, button, media, and typography defaults. Tailwind Typography owns `.prose` rendering used by generated Markdown, including headings, paragraphs, links, emphasis, code, preformatted blocks, blockquotes, lists, rules, tables, and theme color variants. Admonitions and site-specific global rules also depend on regular CSS and Tailwind's cascade.

[`src/styles/prose.prototype.css`](../../src/styles/prose.prototype.css) is an intentionally unimported regular-CSS prototype for these semantic Markdown elements. It shows that React wrappers are unnecessary, but it is not evidence of complete Typography parity. A real Tailwind-removal change should wire this stylesheet, compare every supported Markdown construct, then remove preflight and utilities incrementally.

StyleX's restricted selector model is awkward for global generated-Markdown descendants. Keeping those rules in maintained regular CSS is the intended boundary, not a compatibility failure. Shared Astro-script state works through data attributes and compiled ancestor conditions.

## Measurements

Both builds use committed `HEAD` `2c1688c44cf896ae4f51f73d591f19b02e6217b6` as their source baseline. The rerun adds `unplugin-stylex` 0.6.3 and upgrades Astro 7.1.0 to 7.2.2 plus `@astrojs/react` 6.0.1 to 6.0.2.

| Production output |  Baseline |     Spike |      Difference |
| ----------------- | --------: | --------: | --------------: |
| CSS, raw          | 149,960 B | 152,721 B |        +2,761 B |
| CSS, gzip         |  27,147 B |  25,792 B |        -1,355 B |
| JavaScript, raw   | 930,695 B | 930,132 B |          -563 B |
| JavaScript, gzip  | 264,488 B | 260,245 B |        -4,243 B |
| Build wall time   |   78.26 s |   82.27 s | +4.01 s (+5.1%) |

The JavaScript totals cover emitted `.js` assets and therefore exclude the 253-byte inline stylesheet loader. No `stylex.create`, `stylex.props`, conditional helper, marker call, virtual-module reference, debug source path, or StyleX runtime call remains in production output.

## Verification

- `pnpm run check`: passed with zero errors, warnings, or hints in baseline and rerun.
- `pnpm run build`: passed; 47 pages built, the three inspected routes load extracted `stylex.css`, and no uncompiled or debug StyleX expression remains.
- HMR: failed the no-reload criterion. Header and Tooltip value changes appeared after an automatic full reload; the browser console had no application error, but the dev server emitted the serve-compatibility warning above.
- Visuals: homepage, posts listing, and one article were compared in light and dark at 375x812 and 1440x900. Eleven comparisons were pixel-identical; article mobile dark had RMSE 0.93 on a 65,535 scale from text antialiasing, with no visible difference.
- Interaction: keyboard activation toggled the mobile menu between `aria-expanded="true"`/visible and `aria-expanded="false"`/hidden. Links and Tooltip behavior remained available.
- Accessibility: Axe found the same route-level violation IDs as the baseline and no new Header or Tooltip violation. Existing chart ARIA, draft-label contrast, and article code-block findings remain outside this spike.

Baseline screenshots are retained at `/Users/emiller/.codex/visualizations/2026/08/24/01a03631-268a-7653-8654-5b918cab9b50/stylex-spike/`; rerun screenshots are in the sibling `stylex-spike-package/` directory.
