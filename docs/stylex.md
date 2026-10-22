# Styling contract

StyleX owns first-party module styles. Define styles in a colocated `*.stylex.ts` module and apply
them in Foldkit with `h.Class(stylex.props(styles.name).className ?? '')`. Do not add wrappers or
another runtime to apply styles. Existing styles under `src/components/`, `src/pages/`, and
`src/layouts/` are reused by native Foldkit views.

Use semantic names such as `navigation`, `menuLink`, and `expandedIcon`. Prefer logical properties.
Import shared colors, fonts, breakpoints, spacing, and motion from `src/styles/tokens.stylex.ts`.
Keep server and browser initial views deterministic for hydration.

Semantic classes such as `prose`, `h-entry`, and `e-content` may coexist with StyleX. Regular CSS
is appropriate for reset/theme variables, fonts, compiled Markdown and code highlighting,
microformats, third-party selectors, keyframes, reduced motion and canvas placement. Inline styles
are limited to dynamic data such as chart coordinates and generated syntax colors.

The Foldkit Vite plugin provides development reload support. Content changes rebuild the generated
data and reload the page. Do not introduce manual HMR listeners or duplicate application roots.

Run `pnpm lint:stylex` with the other checks and inspect affected states in the browser. The visual
contract is `DESIGN.md`.
