#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
output_dir="$(mktemp -d)"
trap 'rm -rf "$output_dir"' EXIT

run_vale() {
  corepack pnpm dlx @vvago/vale \
    --no-global \
    --config="$repo_root/.vale.ini" \
    --output=JSON \
    --no-exit \
    "$1"
}

run_vale "$repo_root/tests/vale/good.md" >"$output_dir/good.json"
run_vale "$repo_root/tests/vale/sentence-length.md" >"$output_dir/sentence-length.json"

node --input-type=module - "$output_dir" <<'NODE'
import fs from 'node:fs';
import path from 'node:path';

const outputDir = process.argv[2];
const alerts = (name) =>
  Object.values(JSON.parse(fs.readFileSync(path.join(outputDir, `${name}.json`), 'utf8'))).flat();

const goodAlerts = alerts('good');
if (goodAlerts.length > 0) {
  throw new Error(`Expected good.md to pass, found: ${goodAlerts.map((alert) => alert.Check).join(', ')}`);
}

const sentenceAlerts = alerts('sentence-length');
if (!sentenceAlerts.some((alert) => alert.Check === 'WriteSimply.SentenceLength')) {
  throw new Error('Expected sentence-length.md to trigger WriteSimply.SentenceLength');
}
NODE
