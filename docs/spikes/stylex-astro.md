---
purpose: Record the StyleX 0.19 compatibility spike and migration recommendation.
applies_to: The disposable spike/stylex-astro branch only.
entrypoint: Review the decision, measurements, and implementation findings below.
verification: Re-run the listed checks from the spike worktree at its recorded commit.
update_when: The StyleX integration, measurements, or migration decision changes.
---

# StyleX compatibility spike for Astro

## Decision

Do not replace Tailwind with StyleX across this site yet. StyleX 0.19 works in both Astro and React without converting Astro components to React, and the coexistence build is smaller. However, the Astro adapter, production CSS injection target, development virtual stylesheet, cascade configuration, and stylesheet-readiness behavior add enough site-specific machinery that plain scoped CSS is the simpler path if Tailwind is removed.

| Requirement                                                  | Result                                                                                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Astro components stay Astro-native                           | Pass: `Header.astro` uses a small colocated adapter and gains no hydration                                               |
| Development and production compile without framework patches | Pass, with explicit virtual CSS/runtime loading in development and a production injection target                         |
| Regular CSS can replace Tailwind Typography                  | Partial: responsibilities are inventoried and a prototype exists, but complete article parity was not wired and verified |
| Visual and accessibility parity                              | Pass for the migrated surfaces and tested pages                                                                          |
| Production size limits                                       | Pass: gzip CSS decreased 2,867 bytes and gzip JavaScript decreased 444 bytes                                             |
| Tailwind removal is demonstrated                             | Not yet: global/preflight, Typography, utility strings, PostCSS, and `tailwind-merge` remain                             |

## Implementation findings

- `@stylexjs/unplugin` integrates through Astro's Vite plugin list. Production extraction needed `cssInjectionTarget` to select the site's shared `base.*.css`; the default chunk selection attached generated rules to an unrelated CSS asset.
- Development needs `/virtual:stylex.css` and `/@id/virtual:stylex:runtime` loaded by the base layout. HMR updated a representative Tooltip rule without a page reload, preserved page JavaScript state, and produced no console error.
- The virtual development stylesheet can become ready shortly after navigation and Vite's network-idle signal. Browser verification therefore waited for a representative computed StyleX rule; without that wait, a brief unstyled capture was possible.
- `useCSSLayers: true` changed cascade precedence against Tailwind preflight. The coexistence spike disables StyleX layers to preserve the current button and mobile-menu rendering.
- Astro consumes the adapter's precompiled `{ className, style? }` result after a narrow conversion to `{ class, style? }`. `stylex.when.ancestor()` must remain inline in `stylex.create()` so the compiler transforms it.

The Header exercises responsive rules, pseudo-states, shared theme variables, and ancestor-driven mobile-menu state. The Tooltip uses `stylex.create()` and conditional `stylex.props()` directly while preserving its public types, Motion behavior, and data-driven inline positioning.

## Global and prose CSS inventory

Tailwind preflight currently owns the reset plus global element, form, button, media, and typography defaults. Tailwind Typography owns `.prose` rendering used by generated Markdown, including headings, paragraphs, links, emphasis, code, preformatted blocks, blockquotes, lists, rules, tables, and theme color variants. Admonitions and site-specific global rules also depend on regular CSS and Tailwind's cascade.

[`src/styles/prose.prototype.css`](../../src/styles/prose.prototype.css) is an intentionally unimported regular-CSS prototype for these semantic Markdown elements. It shows that React wrappers are unnecessary, but it is not evidence of complete Typography parity. A real Tailwind-removal change should wire this stylesheet, compare every supported Markdown construct, then remove preflight and utilities incrementally.

Unsupported or awkward cases observed were StyleX's restricted selector model, global generated-Markdown descendants, and state shared between an Astro script and compiled ancestor conditions. These are maintainable in regular CSS or data attributes, but forcing them all into StyleX would make the implementation harder to follow.

## Measurements

Both builds used committed `HEAD` `2c1688c44cf896ae4f51f73d591f19b02e6217b6` as their source baseline.

| Production output |  Baseline |     Spike |       Difference |
| ----------------- | --------: | --------: | ---------------: |
| CSS, raw          | 149,960 B | 135,154 B |        -14,806 B |
| CSS, gzip         |  27,147 B |  24,280 B |         -2,867 B |
| JavaScript, raw   | 930,695 B | 930,118 B |           -577 B |
| JavaScript, gzip  | 264,488 B | 264,044 B |           -444 B |
| Build wall time   |   78.26 s |   87.52 s | +9.26 s (+11.8%) |

The output contains the extracted StyleX marker and rules in the shared CSS asset. No `stylex.create`, `stylex.props`, conditional StyleX helper, or StyleX runtime call remains in production output.

## Verification

- `pnpm run check`: passed with zero errors, warnings, or hints in baseline and spike.
- `pnpm run build`: passed in baseline and spike; homepage, posts listing, and article output all reference the shared extracted stylesheet.
- HMR: a Tooltip radius change updated without reload; a window sentinel survived and the browser console remained clean.
- Visuals: homepage, posts listing, and one article matched pixel-for-pixel in light and dark at 375x812 and 1440x900 after waiting for stylesheet readiness. The mobile menu was also captured open.
- Interaction: keyboard menu disclosure synchronized `aria-expanded` and `data-menu-open`; navigation, links, and Tooltip behavior remained available. Axe reported the same violation totals and no new Header or Tooltip violation across the three routes. Existing chart ARIA, draft-label contrast, and article code-block findings remain outside this spike.

Screenshots are retained outside the branch at `/Users/emiller/.codex/visualizations/2026/08/24/01a03631-268a-7653-8654-5b918cab9b50/stylex-spike/`.
