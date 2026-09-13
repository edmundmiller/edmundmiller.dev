# Vale

The site lints Markdown and MDX posts with Vale 3.18 and four styles:

| Style               | Source                                                                               | Pin                                                                        |
| ------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| WriteSimply         | [edmundmiller/WriteSimply](https://github.com/edmundmiller/WriteSimply) `v1.0.0` zip | SHA-256 `4a6fc7a06c9ccdd33c6ec8e7070ff12e567ad8bc97b533c174b6245a12c3a5a2` |
| LLMCliches          | [edmundmiller/vale-llm-cliches](https://github.com/edmundmiller/vale-llm-cliches)    | `d74b5d40421855c3a82352a3177226dae6d3a58f`                                 |
| STE, STEDescriptive | private ClearTechnical                                                               | `8c58de412b17ecb30a590d6982e11e91b0fea459`                                 |

This follows the nascent-manuscript / mill-docs pattern: a sync script installs
pinned styles; the generated trees are not committed.

## Sync

```bash
pnpm vale:sync
```

or `scripts/sync_vale_styles.sh`. The script checksum-installs WriteSimply,
sparse-fetches LLMCliches, and clones ClearTechnical when credentials exist.

ClearTechnical is private. Cloud agents and this public repository's GitHub
Actions must skip it:

```bash
SKIP_CLEAR_TECHNICAL=1 pnpm vale:sync
```

When skipped, the script writes empty `styles/STE` and
`styles/STEDescriptive` stubs so `.vale.ini` `BasedOnStyles` still loads.
Override `CLEAR_TECHNICAL_REPO` if the clone URL differs from
`https://github.com/edmundmiller/ClearTechnical`.

`vale sync` only installs `Packages` (the WriteSimply zip). Prefer the script
so LLMCliches and ClearTechnical stay pinned.

## Ignore and CI

`.gitignore` excludes the generated style directories:

- `styles/WriteSimply/`
- `styles/LLMCliches/`
- `styles/STE/`
- `styles/STEDescriptive/`

CI installs Vale, runs `SKIP_CLEAR_TECHNICAL=1 scripts/sync_vale_styles.sh`,
checks that WriteSimply and LLMCliches landed, then runs `pnpm test:vale`.
Fixture tests use `tests/vale/.vale.ini` (WriteSimply only) so LLMCliches / STE
do not leak into rule counts. `pnpm lint:prose` is the corpus check and is not
a CI gate; it reports suggestions without rewriting posts.

## Rule noise

`.vale.ini` disables `LLMCliches.ChatbotArtifacts` (`utm_source=` is common in
analytics posts) and the STE/STEDescriptive word-list / article / tense /
pronoun checks that flood a personal site. Revisit those names after a
successful private ClearTechnical sync if the package uses different rule
files.
