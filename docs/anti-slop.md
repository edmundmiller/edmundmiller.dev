# Anti-slop lint tooling

The pinned anti-slop integration uses **explicitly approved staged activation**. Pre-update gates are preserved; zero-conflict additions and Fowler advisories run in normal lint. Conflicting incoming rules retain their full intended severities in the explicit strict proposal. Full adoption is not accepted, and no permanent exemptions or source migration are implied. The old lint/typecheck passed before integration; incoming strict findings are not pre-existing check failures.

## Free, offline checks

- `pnpm lint`: ordinary Oxlint with zero-conflict core and Effect AST additions at error and Fowler smells at warn, preserving all pre-update rules/options/severities. No semantic plugin is loaded, even when model credentials happen to be set.
- `pnpm lint:changed`: the same deterministic rules on staged, unstaged, and untracked JS/TS files. Unchanged, deleted and ignored files are omitted. Other flags pass through to Oxlint.
- `pnpm lint:strict`: explicit, offline full AST proposal. It preserves the normal configuration and adds the 12 conflicting incoming rules at their intended error severity/options, including readable spacing and test colocation. It is expected to report unresolved findings; it is not part of ordinary lint/editor/check/CI gates. Use `pnpm lint:changed -c oxlint.strict.config.mjs` for the same strict policy on changed files only.
- `pnpm check`, `pnpm lint:stylex`, `pnpm format:check`, content/app tests and existing mise tasks retain their original purposes. No model/network step was added.
- `pnpm test:lint`: typechecks vendored rules with the existing TypeScript toolchain, runs upstream rule/diff tests, and exercises local configuration, network isolation, and changed-code scope using fake credentials/local mocks only. It never requires real credentials.

Dependencies are installed explicitly with `mise run setup`; pnpm's implicit dependency installation before scripts is disabled. This keeps ordinary lint/check from contacting the registry. Keep `oxlint` and `@oxlint/plugins` at exactly the same version.

Oxlint's JS bridge needs a 6 GiB virtual address reservation, not 6 GiB of physical RAM. On this small orb, verification temporarily enabled memory overcommit with an exit trap restoring its original setting. No allocation repair is included in setup/resume or the rollout patch; durable bootstrap repair is a separate suggested fix.

## Explicit semantic opt-ins

These commands are installed for later use, **not authorized to run against a real model by this rollout**. They can transmit repository code and cost money when a provider or command is configured. They are not part of ordinary lint, editor diagnostics, `check`, CI, hooks or mise task groups.

- `pnpm lint:jev`: semantic review of changed files with the pinned Effect and Fowler questions. All 11 Effect questions and eight Fowler questions target **whole files**, including unchanged functions in each changed file. Four Fowler questions target complete functions and filter to functions overlapping changed lines. This is not a changed-lines-only disclosure guarantee. Upstream caps/truncates long snippets; function/call filtering does not narrow whole-file questions.
- `pnpm lint:jev:full`: semantic review of the whole nonignored project rather than only changed files.
- `pnpm lint:diff --working`: review uncommitted changes. Without `--working`, the default review is the branch since its merge-base plus local changes. `--base <ref>`, `--staged`, and `--committed` select other scopes. The payload includes hunks, surrounding context, summary, commit subjects and history/co-change metadata. Vendored tooling and installed agent assets are excluded.

The existing upstream missing-credential behavior is preserved: Jev warns/skips outside CI but fails if explicitly invoked with `CI` set; diff review warns/skips without a backend unless strict flags/configuration request failure. A successful skipped run is not model validation. This repository configures no paid CI gate and stores no credentials.

The TypeSafe, Factory, gateway, compatible-model and local-command transports remain upstream-owned. See the pinned upstream [Jev documentation](https://github.com/K-Mistele/anti-slop/blob/b7c1619b4d51b4815e89ba3700a975a6ec54b8c3/docs/jev.md), [diff documentation](https://github.com/K-Mistele/anti-slop/blob/b7c1619b4d51b4815e89ba3700a975a6ec54b8c3/docs/diff-rules.md) and [vendored fork README](../tools/oxlint/oxlint-plugin-jev/README.md) before an authorized run.

## Pending full adoption and compatibility

`anti-slop-effect/no-test-code-in-src` rejects the three existing `src/app/` Story/Scene test files, while the site's README deliberately specifies colocation. Keep the tests where they are. This rule is staged in [the strict proposal](../oxlint.strict.config.mjs), not enabled in normal lint; no test-file exception has been applied. Full adoption still needs a policy/migration decision, not another staging approval. The other staged rules concern ternary depth, filter/map chains, conditional spreads, known-value widening, runtime typeof, unknown parameters, unsafe dictionaries, readable spacing, assertion-safety comments, manual tag comparison, and Effect match.

Effect `4.0.0` supports the AST rules' relevant APIs. `@effect/tsgo@0.48.0` requires TypeScript 7 in its documented support matrix, so its patch is deferred; TypeScript stays at `5.9.3` and the normal typecheck remains unchanged.

Source, exact pins, licenses, local decisions and future merge instructions are recorded in [anti-slop provenance](../tools/oxlint/anti-slop/UPSTREAM.md). Future updates must merge reviewed changes with local policy and tests, not overwrite this tree. No product source or deployment configuration changed in this integration.
