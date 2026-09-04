# Agent Instructions

Personal Astro site deployed as a Cloudflare Worker with static assets.

Complete the requested local work through a reviewable result, including resolving failures caused
by the change. Publishing, pushing, merging, and deploying require user authorization; a local task
or automation hook is not that authorization.

## Repository contracts

- Commands and checks: `package.json`. `npm run build` validates Astro output, regenerates agent
  content, and runs Pagefind via `postbuild`. Documentation-only edits need no site build.
- Deployment: `wrangler.toml` and `src/worker.ts`.
- First-party styling: [`docs/stylex.md`](docs/stylex.md), including the StyleX boundaries and check.
- Posts: `src/content/post/`; schema and slug rules: `src/content.config.ts`.
- Skills: `.agents/skills/`, shared via symlinks with `.pi/skills/` and `.opencode/skills/`.
  `npm run skills:sync` imports `skills.sources.json` pins and applies `.agents/skills.patch`.
  Include local skill edits in that patch; CI checks that syncing reproduces the tracked files.

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

`npm run deploy` builds and deploys with Wrangler. Before changing deployment behavior or performing
an authorized deployment, verify live access and state:

```bash
npm exec -- wrangler whoami
npm exec -- wrangler deployments list
```

Unrelated missing OAuth-scope warnings are not blockers if the required read/deploy commands work.

## Codex Automation

The Stop hook flushes `br` and blocks on uncommitted work or an unsynchronized upstream. It permits
a forced continuation to stop. For local-only work, report the unpushed commit rather than following
the hook's push instruction; leave unrelated work intact.
