# Agent Instructions

Personal Astro site deployed as a Cloudflare Worker with static assets.

Complete the requested local work through a reviewable result, including resolving failures caused
by the change. Publishing, pushing, merging, and deploying require user authorization; a local task
or automation hook is not that authorization.

## Scope and routing

This file applies repository-wide. A nearer `AGENTS.md` adds directory-specific guidance and wins
for that scope if instructions conflict.

- Posts and other files under `src/content/`: read `src/content/AGENTS.md`.
- UI structure or visual changes: read `DESIGN.md` and `docs/stylex.md`. Use the
  `frontend-design` skill for a new visual direction, `web-design-guidelines` for an explicit UI or
  accessibility review, and `agent-browser` to inspect rendered behavior. Load only skills relevant
  to the task.
- Runtime and deployment behavior: inspect `src/worker.ts` together with `wrangler.toml`.
- Site metadata and navigation: `src/site.config.ts` is authoritative.
- Content fields and post IDs: `src/content.config.ts` is authoritative.

Keep investigation scoped to the owner and its callers. Prefer targeted `rg` searches and focused
checks over reading generated output or unrelated post history.

## Sources of truth and generated files

- Tool versions and task entrypoints: `mise.toml`; underlying commands: `package.json`.
- `dist/` is ignored generated output. Do not edit it. `pnpm build` recreates the Astro site, then
  `scripts/generate-agent-content.mjs` writes the Markdown and `llms*.txt` representations, and the
  `postbuild` lifecycle builds the Pagefind index.
- First-party styling follows [`docs/stylex.md`](docs/stylex.md); the visual contract lives in
  `DESIGN.md`.
- Skills: `.agents/skills/`, shared via symlinks with `.pi/skills/` and `.opencode/skills/`.
  `skills.sources.json` owns upstream pins and `.agents/skills.patch` owns local changes.
  `pnpm skills:sync` reconstructs the imported copies; do not leave edits that exist only in those
  copies. CI checks that regeneration is clean.

## Verification

Use the narrowest checks that cover the change. Commands below are repository entrypoints; do not
replace them with ad hoc equivalents.

| Change                                                           | Checks                                                                                                                                       |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository guidance or Markdown docs outside `src/content/post/` | `pnpm exec oxfmt --check <files>`; verify referenced paths and commands                                                                      |
| Post prose or frontmatter                                        | Follow `src/content/AGENTS.md`                                                                                                               |
| TypeScript, React, or Astro behavior                             | `pnpm format:check`, `pnpm lint`, `pnpm check`; add `pnpm build` when output, routes, content loading, or generated agent content can change |
| First-party styles                                               | Checks above plus `pnpm lint:stylex`; inspect representative changed states in a browser                                                     |
| Vale rules or fixtures                                           | `pnpm test:vale` and `pnpm lint:prose`                                                                                                       |
| Codex closeout hooks                                             | `pnpm test:hooks`                                                                                                                            |
| Skill pins, patches, or imported skill files                     | `pnpm skills:sync`, then confirm `git diff --exit-code -- .agents/skills .pi/skills .opencode/skills`                                        |
| Production/deployment configuration                              | `pnpm build`; inspect the Wrangler diff without deploying                                                                                    |

`mise run lint`, `mise run test`, and `mise run build` are the aggregate project task groups.
Documentation-only edits do not require a site build. If a required check cannot run, report the
exact gap rather than substituting a weaker claim.

## Issue tracking

Use `br` to update [`.beads/issues.jsonl`](.beads/issues.jsonl), the tracked issue source; direct edits
bypass its database. For issue work:

```bash
br ready
br show <id>
br update <id> --status in_progress
br close <id>
br sync --flush-only
```

## Deployment

`pnpm deploy` builds and deploys with Wrangler. Before changing deployment behavior or performing
an authorized deployment, verify live access and state:

```bash
pnpm exec wrangler whoami
pnpm exec wrangler deployments list
```

Unrelated missing OAuth-scope warnings are not blockers if the required read/deploy commands work.

## Codex Automation

The Stop hook flushes `br` and blocks on uncommitted work or an unsynchronized upstream. It permits
a forced continuation to stop. For local-only work, report the unpushed commit rather than following
the hook's push instruction; leave unrelated work intact.
