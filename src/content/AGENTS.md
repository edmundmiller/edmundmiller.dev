# Post Writing

Use Paul Graham's [Write Simply](https://paulgraham.com/simply.html) as the writing reference.
Vale also applies LLMCliches and, when synced, ClearTechnical STE / STEDescriptive.
Run `pnpm vale:sync` (cloud: `SKIP_CLEAR_TECHNICAL=1`) then `pnpm lint:prose`.
See [`docs/vale.md`](../../docs/vale.md).

Keep instruction files outside `post/`: its Markdown/MDX glob treats every matching file as a post.
