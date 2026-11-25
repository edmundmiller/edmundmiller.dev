# Styling contract

StyleX owns first-party module styles. Define styles in a colocated `*.stylex.ts` module and apply
them in Foldkit with `h.Class(stylex.props(styles.name).className ?? '')`. Do not add wrappers or
another runtime to apply styles. Existing styles under `src/components/`, `src/pages/`, and
`src/layouts/` are reused by native Foldkit views.

Use semantic names such as `navigation`, `menuLink`, and `expandedIcon`. Prefer logical properties.
Import shared colors, fonts, breakpoints, spacing, and motion from `src/styles/tokens.stylex.ts`.
Keep server and browser initial views deterministic for hydration.

- `pnpm lint` runs `pnpm lint:stylex` automatically through the `prelint` lifecycle hook before Oxlint. StyleX enforces the spacing scale in `eslint.config.mjs` for margins, padding, and gaps, including responsive and pseudo-class values. Use an allowed value or an imported spacing token instead of a one-off value such as `13px`.
- Color properties require imported StyleX tokens, apart from CSS keywords such as `transparent`, `currentColor`, and `inherit`. Shadows and background images use shared `effects` tokens. Define palette values and effects in `src/styles/tokens.stylex.ts`, not in consuming styles.
- `pnpm test:design` checks that the lint contract rejects violations and accepts tokens and layout/accessibility exceptions. CI runs both commands.

Semantic classes such as `prose`, `h-entry`, and `e-content` may coexist with StyleX. Regular CSS
is appropriate for reset/theme variables, fonts, compiled Markdown and code highlighting,
microformats, third-party selectors, keyframes, reduced motion and canvas placement. Inline styles
are limited to dynamic data such as chart coordinates and generated syntax colors.

The Foldkit Vite plugin provides development reload support. Content changes rebuild the generated
data and reload the page. Do not introduce manual HMR listeners or duplicate application roots.

Run `pnpm lint` with the other checks and inspect affected states in the browser. The visual
contract is `DESIGN.md`.
