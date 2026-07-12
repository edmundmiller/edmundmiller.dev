---
purpose: Enforce practical signals from Paul Graham's Write Simply with Vale.
applies_to: Markdown and MDX prose.
entrypoint: Enable WriteSimply through BasedOnStyles in .vale.ini.
verification: Run npm run test:vale.
update_when: Rules, thresholds, fixtures, or Vale integration change.
---

# WriteSimply

`WriteSimply` turns the testable parts of Paul Graham's [Write Simply](https://paulgraham.com/simply.html) into Vale suggestions. It favors ordinary words, short sentences, low reading friction, and aggressive cutting.

The rules are prompts for revision, not mechanical truth. Technical terms can be exact. Long sentences can be deliberate. Disable a rule when complexity creates a useful effect.

## Rules

| Rule                             | Signal                                             |
| -------------------------------- | -------------------------------------------------- |
| `WriteSimply.NeedlessWords`      | Stock phrases that can usually be cut              |
| `WriteSimply.ParagraphLength`    | Paragraphs over 100 words                          |
| `WriteSimply.PlainWords`         | Formal words and phrases with plainer alternatives |
| `WriteSimply.Readability`        | Document grade level above 10                      |
| `WriteSimply.SentenceComplexity` | Sentences with more than three commas              |
| `WriteSimply.SentenceLength`     | Sentences over 25 words                            |

## Use

Point Vale at the parent `styles` directory:

```ini
StylesPath = styles

[*.{md,mdx}]
BasedOnStyles = WriteSimply
```

Run the site linter:

```sh
npm run lint:prose
```

Suppress local prose checks around deliberate Markdown or MDX prose:

```markdown
<!-- vale off -->

This sentence is long on purpose.

<!-- vale on -->
```

This repo maps MDX to Markdown, so both formats use the same HTML controls.
Document-wide rules such as `WriteSimply.Readability` still run.

## Test

Each rule has a failing fixture, while `tests/vale/good.md` proves plain prose and inline code stay clean.

```sh
npm run test:vale
```

The style is package-ready: archive the top-level `WriteSimply/` directory for a Vale style-only release.
