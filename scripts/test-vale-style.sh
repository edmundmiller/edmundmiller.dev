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
run_vale "$repo_root/tests/vale/thin-content.md" >"$output_dir/thin-content.json"
run_vale "$repo_root/tests/vale/draft-markers.md" >"$output_dir/draft-markers.json"
run_vale "$repo_root/tests/vale/spoken-fillers.md" >"$output_dir/spoken-fillers.json"
run_vale "$repo_root/tests/vale/bare-link.md" >"$output_dir/bare-link.json"
run_vale "$repo_root/tests/vale/long-quotation.md" >"$output_dir/long-quotation.json"
run_vale "$repo_root/tests/vale/decorative-language.md" >"$output_dir/decorative-language.json"
run_vale "$repo_root/tests/vale/parenthesis-spacing.md" >"$output_dir/parenthesis-spacing.json"

node --input-type=module - "$output_dir" <<'NODE'
import fs from 'node:fs';
import path from 'node:path';

const outputDir = process.argv[2];
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
  'draft-markers': ['WriteSimply.DraftMarkers', 'WriteSimply.ThinContent'],
  'spoken-fillers': ['WriteSimply.SpokenFillers', 'WriteSimply.ThinContent'],
  'bare-link': ['WriteSimply.BareLink', 'WriteSimply.ThinContent'],
  'long-quotation': ['WriteSimply.LongQuotation', 'WriteSimply.Readability', 'WriteSimply.ThinContent'],
  'decorative-language': ['WriteSimply.DecorativeLanguage', 'WriteSimply.ThinContent'],
  'parenthesis-spacing': ['WriteSimply.ParenthesisSpacing', 'WriteSimply.ThinContent'],
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

const brokenCountMessages = ['sentence-length', 'sentence-complexity']
  .flatMap(alerts)
  .filter((alert) => alert.Message.includes('%!s(int='));
if (brokenCountMessages.length > 0) {
  throw new Error('Occurrence rule messages contain broken count formatting');
}
NODE
