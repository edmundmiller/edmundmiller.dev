#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
output_dir="$(mktemp -d)"
trap 'rm -rf "$output_dir"' EXIT

run_vale() {
  corepack pnpm exec vale \
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

node --input-type=module - "$output_dir" <<'NODE'
import fs from 'node:fs';
import path from 'node:path';

const outputDir = process.argv[2];
const alerts = (name) =>
  Object.values(JSON.parse(fs.readFileSync(path.join(outputDir, `${name}.json`), 'utf8'))).flat();
const assertRule = (fixture, rule) => {
  if (!alerts(fixture).some((alert) => alert.Check === rule)) {
    throw new Error(`Expected ${fixture}.md to trigger ${rule}`);
  }
};

const goodAlerts = alerts('good');
if (goodAlerts.length > 0) {
  throw new Error(`Expected good.md to pass, found: ${goodAlerts.map((alert) => alert.Check).join(', ')}`);
}

assertRule('sentence-length', 'WriteSimply.SentenceLength');
assertRule('plain-words', 'WriteSimply.PlainWords');
assertRule('needless-words', 'WriteSimply.NeedlessWords');
assertRule('sentence-complexity', 'WriteSimply.SentenceComplexity');
assertRule('readability', 'WriteSimply.Readability');
assertRule('paragraph-length', 'WriteSimply.ParagraphLength');

if (!alerts('plain-words').some((alert) => alert.Message.includes("Use 'Use' instead of 'Utilize'"))) {
  throw new Error('Expected sentence-initial substitutions to preserve capitalization');
}

if (!alerts('suppression').some((alert) => alert.Check === 'WriteSimply.SentenceLength')) {
  throw new Error('Expected JSX-style MDX suppression to reproduce the documented suppression bug');
}

const brokenCountMessages = ['sentence-length', 'sentence-complexity']
  .flatMap(alerts)
  .filter((alert) => alert.Message.includes('%!s(int='));
if (brokenCountMessages.length > 0) {
  throw new Error('Occurrence rule messages contain broken count formatting');
}
NODE
