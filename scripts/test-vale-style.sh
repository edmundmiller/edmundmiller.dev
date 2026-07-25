#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
output_dir="$(mktemp -d)"
trap 'rm -rf "$output_dir"' EXIT
export PATH="$repo_root/node_modules/.bin:$PATH"

run_vale() {
  "$repo_root/node_modules/.bin/vale" \
    --no-global \
    --config="$repo_root/.vale.ini" \
    --output=JSON \
    --no-exit \
    "$1"
}

run_vale "$repo_root/tests/vale/good.md" >"$output_dir/good.json"
run_vale "$repo_root/tests/vale/sentence-length.md" >"$output_dir/sentence-length.json"
run_vale "$repo_root/tests/vale/plain-words.md" >"$output_dir/plain-words.json"
run_vale "$repo_root/tests/vale/needless-words.md" >"$output_dir/needless-words.json"
run_vale "$repo_root/tests/vale/sentence-complexity.md" >"$output_dir/sentence-complexity.json"
run_vale "$repo_root/tests/vale/readability.md" >"$output_dir/readability.json"
run_vale "$repo_root/tests/vale/paragraph-length.md" >"$output_dir/paragraph-length.json"
run_vale "$repo_root/tests/vale/suppression.mdx" >"$output_dir/suppression.json"
run_vale "$repo_root/tests/vale/thin-content.mdx" >"$output_dir/thin-content.json"
run_vale "$repo_root/tests/vale/thin-content-draft.mdx" >"$output_dir/thin-content-draft.json"
run_vale "$repo_root/tests/vale/thin-content-body-draft.mdx" >"$output_dir/thin-content-body-draft.json"
run_vale "$repo_root/tests/vale/thin-content-notdraft.mdx" >"$output_dir/thin-content-notdraft.json"
run_vale "$repo_root/tests/vale/draft-markers.md" >"$output_dir/draft-markers.json"
run_vale "$repo_root/tests/vale/spoken-fillers.md" >"$output_dir/spoken-fillers.json"
run_vale "$repo_root/tests/vale/bare-link.md" >"$output_dir/bare-link.json"
run_vale "$repo_root/tests/vale/long-quotation.md" >"$output_dir/long-quotation.json"
run_vale "$repo_root/tests/vale/decorative-language.md" >"$output_dir/decorative-language.json"
run_vale "$repo_root/tests/vale/parenthesis-spacing.md" >"$output_dir/parenthesis-spacing.json"
run_vale "$repo_root/tests/vale/vague-praise.md" >"$output_dir/vague-praise.json"

node --input-type=module - "$output_dir" "$repo_root" <<'NODE'
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';


const outputDir = process.argv[2];
const repoRoot = process.argv[3];

const alerts = (name) =>
  Object.values(JSON.parse(fs.readFileSync(path.join(outputDir, `${name}.json`), 'utf8'))).flat();
const expectedChecks = {
  good: [],
  'needless-words': ['WriteSimply.NeedlessWords', 'WriteSimply.ThinContent'],
  'paragraph-length': ['WriteSimply.ParagraphLength'],
  'plain-words': ['WriteSimply.PlainWords', 'WriteSimply.Readability', 'WriteSimply.ThinContent'],
  readability: ['WriteSimply.Readability', 'WriteSimply.ThinContent'],
  'sentence-complexity': ['WriteSimply.SentenceComplexity', 'WriteSimply.ThinContent'],
  'sentence-length': ['WriteSimply.Readability', 'WriteSimply.SentenceLength', 'WriteSimply.ThinContent'],
  suppression: ['WriteSimply.Readability', 'WriteSimply.ThinContent'],
  'thin-content': ['WriteSimply.ThinContent'],
  'thin-content-draft': [],
  'draft-markers': ['WriteSimply.DraftMarkers', 'WriteSimply.ThinContent'],
  'thin-content-body-draft': ['WriteSimply.ThinContent'],
  'thin-content-notdraft': ['WriteSimply.ThinContent'],
  'spoken-fillers': ['WriteSimply.SpokenFillers', 'WriteSimply.ThinContent'],
  'bare-link': ['WriteSimply.BareLink', 'WriteSimply.ThinContent'],
  'long-quotation': ['WriteSimply.LongQuotation', 'WriteSimply.Readability', 'WriteSimply.ThinContent'],
  'decorative-language': ['WriteSimply.DecorativeLanguage', 'WriteSimply.ThinContent'],
  'parenthesis-spacing': ['WriteSimply.ParenthesisSpacing', 'WriteSimply.ThinContent'],
  'vague-praise': ['WriteSimply.ThinContent', 'WriteSimply.VaguePraise'],
};

for (const [fixture, expected] of Object.entries(expectedChecks)) {
  const actual = [...new Set(alerts(fixture).map((alert) => alert.Check))].sort();
  if (actual.join() !== expected.join()) {
    throw new Error(`Expected ${fixture} checks ${expected.join(', ') || 'none'}, found ${actual.join(', ') || 'none'}`);
  }
}

if (!alerts('plain-words').some((alert) => alert.Message.includes("Use 'Use' instead of 'Utilize'"))) {
  throw new Error('Expected sentence-initial substitutions to preserve capitalization');
}

for (const phrase of ['upon saving', 'under the impression that', 'in its entirety']) {
  if (!alerts('plain-words').some((alert) => alert.Message.toLowerCase().includes(`instead of '${phrase}'`))) {
    throw new Error(`Expected a plain-word substitution for ${phrase}`);
  }
}

if (alerts('plain-words').some((alert) => alert.Action?.Name === 'replace')) {
  throw new Error('Plain-word suggestions must not offer unsafe automatic replacements');
}

const brokenCountMessages = ['sentence-length', 'sentence-complexity']
  .flatMap(alerts)
  .filter((alert) => alert.Message.includes('%!s(int='));
if (brokenCountMessages.length > 0) {
  throw new Error('Occurrence rule messages contain broken count formatting');
}

const baselineDirectory = fs.mkdtempSync(path.join(tmpdir(), 'vale-baseline-'));
try {
  const baselinePath = path.join(baselineDirectory, 'site-baseline.json');
  const baseline = JSON.parse(fs.readFileSync(path.join(repoRoot, 'tests/vale/site-baseline.json'), 'utf8'));
  const [file, checks] = Object.entries(baseline)[0];
  const [check, count] = Object.entries(checks)[0];

  const assertBaselineMismatch = (expectedCount) => {
    baseline[file][check] = expectedCount;
    fs.writeFileSync(baselinePath, JSON.stringify(baseline));

    const result = spawnSync('node', [path.join(repoRoot, 'scripts/check-vale-baseline.mjs')], {
      cwd: repoRoot,
      encoding: 'utf8',
      env: { ...process.env, VALE_BASELINE: baselinePath },
    });
    if (
      result.status !== 1 ||
      !result.stderr.includes('Vale baseline changed') ||
      !result.stderr.includes(`expected ${expectedCount}, found ${count}`) ||
      !result.stderr.includes('pnpm lint:prose:baseline')
    ) {
      throw new Error(`Expected baseline mismatch failure, got ${result.status}: ${result.stderr}`);
    }
  };

  assertBaselineMismatch(count + 1);
  assertBaselineMismatch(count - 1);
} finally {
  fs.rmSync(baselineDirectory, { force: true, recursive: true });
}
NODE
