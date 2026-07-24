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
run_vale "$repo_root/tests/vale/thin-content.mdx" >"$output_dir/thin-content.json"
run_vale "$repo_root/tests/vale/readability.md" >"$output_dir/readability.json"
run_vale "$repo_root/tests/vale/bare-link.md" >"$output_dir/bare-link.json"
run_vale "$repo_root/tests/vale/decorative-language.md" >"$output_dir/decorative-language.json"
run_vale "$repo_root/tests/vale/draft-markers.md" >"$output_dir/draft-markers.json"
run_vale "$repo_root/tests/vale/long-quotation.md" >"$output_dir/long-quotation.json"
run_vale "$repo_root/tests/vale/needless-words.md" >"$output_dir/needless-words.json"
run_vale "$repo_root/tests/vale/paragraph-length.md" >"$output_dir/paragraph-length.json"

node --input-type=module - "$output_dir" <<'NODE'
import fs from 'node:fs';
import path from 'node:path';

const outputDir = process.argv[2];
const alerts = (name) =>
  Object.values(JSON.parse(fs.readFileSync(path.join(outputDir, `${name}.json`), 'utf8'))).flat();
const expectedChecks = {
  good: [],
  'thin-content': ['WriteSimply.ThinContent'],
  readability: ['WriteSimply.Readability', 'WriteSimply.ThinContent'],
  'bare-link': ['WriteSimply.BareLink', 'WriteSimply.ThinContent'],
  'decorative-language': ['WriteSimply.DecorativeLanguage', 'WriteSimply.ThinContent'],
  'draft-markers': ['WriteSimply.DraftMarkers', 'WriteSimply.ThinContent'],
  'long-quotation': ['WriteSimply.LongQuotation', 'WriteSimply.Readability', 'WriteSimply.ThinContent'],
  'needless-words': ['WriteSimply.NeedlessWords', 'WriteSimply.ThinContent'],
  'paragraph-length': ['WriteSimply.ParagraphLength'],
};

for (const [fixture, expected] of Object.entries(expectedChecks)) {
  const actual = [...new Set(alerts(fixture).map((alert) => alert.Check))].sort();
  if (actual.join() !== expected.join()) {
    throw new Error(`Expected ${fixture} checks ${expected.join(', ') || 'none'}, found ${actual.join(', ') || 'none'}`);
  }
}
NODE
