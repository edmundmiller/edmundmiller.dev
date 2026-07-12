---
purpose: Guide agents working across the edmundmiller.dev repository.
applies_to: All repository files and workflows.
entrypoint: Start with Work Intake, then use the task-specific section.
verification: Run the relevant checks and verify br sync before handoff.
update_when: Repository workflow, deployment, or verification changes.
---

# Agent Instructions

Personal Astro site deployed as a Cloudflare Worker with static assets.

## Work Intake

Use Beads:

The tracked issue source of truth is [`.beads/issues.jsonl`](.beads/issues.jsonl); use `br` commands to read or change it, then flush with `br sync --flush-only`.

```bash
br ready
br show <id>
br update <id> --status in_progress
br close <id>
br sync --flush-only
```

## Deploy Model

`wrangler.toml` is the source of truth.

- Worker name: `edmundmiller-dev`
- Worker entry: `src/worker.ts`
- Asset directory: `dist`
- Asset binding: `ASSETS`
- Route: `edmundmiller.dev/*`
- Zone: `edmundmiller.dev`
- `run_worker_first = true`

`npm run deploy` builds Astro, generates agent content, then runs `wrangler deploy`.

Use `npm exec -- wrangler ...` if `pnpm` is not on PATH.

## Common Commands

```bash
npm run build
npm run check
npm run lint
npm run deploy
npm exec -- wrangler deployments list
npm exec -- wrangler whoami
```

`npm run build` writes `dist/` and runs `scripts/generate-agent-content.mjs`.

## Cloudflare Checks

Before changing deploy behavior, confirm live state:

```bash
npm exec -- wrangler deployments list
npm exec -- wrangler whoami
```

Current verified deploy path uses Wrangler OAuth for account `57398029d3d0add95bdad89deaa41864`.

Latest checked deployment: `2026-07-01T22:37:22Z`, version `8a7c6373-2001-4675-8a2d-f5382b3d65ac`.

If Wrangler warns about missing unrelated OAuth scopes, do not treat that as a deploy blocker unless deploy/read commands fail.

## Session Closeout

Before final handoff:

1. File follow-up Beads issues.
2. Run relevant checks for changed code/content.
3. Close or update Beads issues.
4. `br sync --flush-only`
5. Commit small, single-intent changes.
6. `git pull --rebase`
7. `git push`
8. Verify `git status` is clean and up to date.

Work is not done until push succeeds.
