# Post Writing

This file applies to `src/content/` in addition to the repository root instructions. Keep instruction
and support files outside `post/`: `scripts/compile-content.ts` loads every Markdown and MDX file under
that directory as a post.

## Content contract

- `src/content.config.ts` owns accepted frontmatter, validation limits, defaults, and post ID rules.
  Do not duplicate those values here. Every post needs `title`, `description`, and `publishDate`;
  use only fields accepted there. Its loader also consumes an optional raw `slug` before schema
  parsing; otherwise the post ID comes from the file path, with a directory's `index.md` or
  `index.mdx` using the directory name. Check for an existing ID before adding or moving a post.
- Drafts remain available during development but are excluded from production collections and the
  generated agent-readable content. Use `draft: true` for unfinished posts instead of weakening
  validation or commenting out required metadata.
- Write Markdown with declarative directives. Legacy `.mdx` filenames are accepted, but imports,
  JSX, expressions, and scripts are not. Callouts use `:::note{title="Title"}` (or tip, info,
  warning, danger, success, example, quote); add `collapsible="true"` and optionally
  `collapsed="true"`. Use more colons for an outer nested callout. Videos use
  `::youtube{id="VIDEO_ID_11" title="Accessible title"}`. Images use normal Markdown paths.
- Content becomes typed data rendered by Foldkit. Interactive content must add a Message/update
  case, not a DOM listener or another framework's component.

## Voice and prose

Use Paul Graham's [Write Simply](https://paulgraham.com/simply.html) as the writing reference.
The local Vale style is `styles/WriteSimply/`. Preserve the author's meaning and first-person voice;
apply Vale findings with judgment rather than flattening intentional technical language.

## Verification

- Prose-only edit: `pnpm lint:prose`.
- Frontmatter, filename/slug, Markdown/MDX structure, import, or asset change: `pnpm lint:prose` and
  `pnpm build`. The build is the authoritative check for the content schema, routes, generated
  Markdown, and Pagefind input.
- Change to `styles/WriteSimply/` or its fixtures: also run `pnpm test:vale`.
- Instruction-only edit: `pnpm exec oxfmt --check src/content/AGENTS.md`; no site build is needed.
