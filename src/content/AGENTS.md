# Post Writing

This file applies to `src/content/` in addition to the repository root instructions. Keep instruction
and support files outside `post/`: `src/content.config.ts` loads every Markdown and MDX file under
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
- Keep Markdown for prose-only posts. Use MDX only when imports or components are needed, and keep
  component imports relative to the post.

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
