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

Use `br`; [`.beads/issues.jsonl`](.beads/issues.jsonl) is the tracked source of truth. Never edit it directly.

```bash
br ready
br show <id>
br update <id> --status in_progress
br close <id>
br sync --flush-only
```

## Authoritative Sources

- Scripts and checks: `package.json`
- Worker deployment: `wrangler.toml`
- Issues: `.beads/issues.jsonl` via `br`

## Verification

Run checks matching the change. `npm run build` validates Astro output and regenerates agent content.

## Deployment

`npm run deploy` runs the full build and Wrangler deployment. Before changing deploy behavior or deploying, verify live access and state:

```bash
npm exec -- wrangler whoami
npm exec -- wrangler deployments list
```

If Wrangler warns about missing unrelated OAuth scopes, do not treat that as a deploy blocker unless deploy/read commands fail.

## Codex Automation

The project Stop hook flushes br and blocks completion until task-scoped changes are committed and the branch is synchronized with its upstream.
