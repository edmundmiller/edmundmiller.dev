# Callouts

Write callouts as Markdown directives. Foldkit renders them from content data; do not import
components or use JSX in posts.

```markdown
:::tip{title="Pro Tip"}
This is a helpful tip for readers!
:::

:::info{title="Click to Expand" collapsible="true" collapsed="true"}
This content starts hidden. Lists, links, images and code blocks work inside callouts.
:::
```

Supported types are `note`, `tip`, `info`, `warning`, `danger`, `success`, `example`, and `quote`.
The type selects the default title, icon and semantic colors. Set `title` to override the title.
Set `collapsible="true"` to show a toggle; `collapsed="true"` starts that toggle closed.

For nested callouts, give the outer container more colons:

```markdown
::::warning{title="Before you begin"}
Read the instructions first.

:::note
Keep a backup.
:::
::::
```

The compiler in `scripts/compile-content.ts` validates directives. Native Foldkit views in
`src/app/pages.ts` use the existing StyleX callout styles, while `src/app/model.ts` owns expanded
state. Toggles are keyboard-accessible buttons with `aria-expanded` and `aria-controls`.
The content remains readable in prerendered HTML without JavaScript.

Use `/admonitions-demo/` to inspect the supported types, nesting, and collapsible states in both
themes. See `src/content/AGENTS.md` for the full content contract.
