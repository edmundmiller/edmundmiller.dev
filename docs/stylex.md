# Styling contract

StyleX owns first-party module styles. Keep Astro components Astro-native: define styles in a
colocated `Component.stylex.ts`, import them into the component, and apply them with
`stylex.attrs()`. React modules keep `stylex.create()` beside the component and use
`stylex.props()` for conditional styles. Do not add wrappers or hydration just to apply styles.

Use semantic names such as `navigation`, `menuLink`, and `expandedIcon`, not visual names such as
`redText`. Prefer logical properties. Import shared colors, fonts, breakpoints, spacing, and motion
values from `src/styles/tokens.stylex.ts`; do not create module-specific token layers.

Semantic classes and StyleX may coexist without becoming a public style API:

```astro
---
import * as stylex from '@stylexjs/stylex';
import { styles } from './Entry.stylex';

const entryStyle = stylex.attrs(styles.entry);
---

<article class:list={['h-entry', entryStyle.class]} style={entryStyle.style}>...</article>
```

Stateful Astro components need a development-only HMR boundary because StyleX value changes create
new atomic class names. Follow `Header.astro`: add dev-only style-key markers, accept the colocated
style module from the component's existing client script, and replace only that module's generated
class tokens. The marker and bridge must compile out of production. Stateless modules need no bridge.

Regular CSS remains appropriate only for global reset and theme variables, fonts, generated
Markdown `.prose`, Pagefind, Expressive Code, microformats, third-party selectors, keyframes,
reduced motion, and animation-heavy modules such as PipelineField. Inline styles are limited to
genuinely dynamic data such as coordinates, computed colors, canvas values, and Motion state.

Run `pnpm run lint:stylex` in addition to Oxlint. `no-conflicting-props` stays disabled until inline
data styles and semantic-class coexistence are fully migrated and tested.
