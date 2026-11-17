# anti-slop provenance

- Source: https://github.com/K-Mistele/anti-slop
- Incoming commit: `b7c1619b4d51b4815e89ba3700a975a6ec54b8c3`.
- Installation base: site commit `72a5626a472afa35ca5e0f2ac80259f4e515f9ff`, clean and identical to `origin/main` on 2026-11-16. No existing plugin, custom plugin tests, or prior vendored baseline existed. This is an additive integration, not a claimed three-way merge.
- `tools/oxlint/anti-slop/` contains the complete upstream `src/`, including tests, unchanged. `LICENSE` is upstream's root MIT license. This provenance file is local. Preserve `vendor/eslint-stylistic/LICENSE` and `vendor/eslint-stylistic/UPSTREAM.md`.
- Jev fork: https://github.com/K-Mistele/oxlint-plugin-jev at `fd3e4b1ad3b8fa7c0d08cdc92633e33c7e662f9e`. `../oxlint-plugin-jev/` is the unchanged built package from the incoming anti-slop commit's `skills/install-anti-slop/assets/oxlint-plugin-jev/`, including its license, README, and provenance. The fork is a local `file:` dependency, not the npm package of the same name.

## Integration decisions

Existing Oxlint categories, severities, disabled rules, unused-variable options and ignores are retained. ESLint's separate StyleX config, formatting options, content checks, application source, and CI are not replaced. Vendor/installed agent directories are excluded from application lint; vendor bytes are excluded from formatting. The upstream test suites and local integration checks run separately via `pnpm test:lint`.

Oxlint and `@oxlint/plugins` are both pinned to `1.86.0`, the incoming source's tested pair. The old `1.72.0` cannot satisfy the Jev fork's `>=1.83.0` peer requirement. AI SDK/provider versions match upstream's test dependencies; they support the opt-in runners and offline mock suites, not ordinary checks. pnpm 11's automatic pre-run dependency installation is disabled so ordinary scripts do not resolve packages over the network; explicit `mise run setup`/`pnpm install --frozen-lockfile` remains the dependency-install boundary.

Oxlint's 6 GiB virtual reservation failed on this small orb under its original memory-overcommit setting. Verification temporarily changed the disposable orb's setting with an exit trap restoring the original value. Setup/resume remain unchanged; durable allocation repair is a separate suggested fix, not part of this rollout.

Effect is a direct dependency at `4.0.0`. Its installed API exports include `Context.Service`, `Layer.effect`, tagged schemas, `Effect.catchTag`/`catchTags`/`catchReason`/`catchReasons`, `Effect.fn`, `Effect.withSpan`, and `Effect.provideContext`. The upstream AST bundle is applicable. No Effect runtime/toolchain upgrade is included. `@effect/tsgo@0.48.0` supports TypeScript `7.0.2` / `7.1.0-dev.20260929.1`, not this site's `5.9.3`; its patch/diagnostics are deferred rather than installing an incompatible tool or changing TypeScript.

**Staged activation is explicitly approved.** Normal lint retains all pre-update gates and enables zero-conflict core/Effect additions at error plus seven Fowler advisories at warn; upstream's message-chains remains off. The 12 conflicting incoming rules are configured at full intended severity/options in `oxlint.strict.config.mjs`, invoked only by the explicit, offline `pnpm lint:strict` proposal (or a changed-file run selecting that config). The strict proposal includes all 21 core and 14 Effect AST rules plus native accumulator-spread; it does not replace or weaken any old gate. This is not permanent exemption or full adoption. In particular, `no-test-code-in-src` remains an error in the strict proposal because it contradicts deliberate Story/Scene colocation. No exception, suppression, test relocation, source cleanup, or broad product migration is applied. The previously shipped lint/typecheck passed; unresolved strict findings are new-policy findings.

Semantic rules are registered only in `oxlint.jev.config.mjs`, never in `.oxlintrc.json`. The overlay preserves the base's plugins, rules, overrides, and ignores. Its test override turns off source/Fowler questions and enables only `test-cannot-fail`. No normal `lint`, editor, `check`, mise task, hook, or CI job invokes semantic/diff review.

## Disclosure boundary

`lint:jev` selects staged, unstaged and untracked JS/TS files relative to the current package; deleted/ignored/unchanged files are omitted. **All 11 Effect questions and eight Fowler questions target whole files**, so unchanged functions inside a changed file are sent too, subject to the upstream snippet limit. Four Fowler questions (`mysterious-name`, `feature-envy`, `primitive-obsession`, `comments`) target complete functions and filter to functions overlapping changed lines. This is not changed-lines-only disclosure. The fork also supports changed-call filtering; no preset is silently rewritten. `lint:jev:full` removes changed-only filtering. Diff review sends changed hunks plus surrounding context, a change summary, and history/co-change metadata, not only added lines.

No model request, paid CI gate, secret setup, publication, deployment, or push was performed. `tests/lint/` uses fake credentials and loopback mocks with an external-network guard. Its harness keeps temporary fixtures under `.amp/in/orb-backup/`, uses a Git ceiling to prevent accidental parent-repo discovery, and isolates upstream's deliberately SDK-free fixture from ancestor `node_modules` without changing upstream tests.

See `docs/anti-slop.md` and the shared rollout coverage artifact for commands, current verification, and pending full-adoption decisions.
