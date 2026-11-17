import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const scratch = resolve('.amp/in/orb-backup/anti-slop-tests');

mkdirSync(scratch, { recursive: true });

// Never inherit a real model credential, endpoint, or command in this offline suite.
const env = Object.fromEntries(
  Object.entries(process.env).filter(
    ([key]) =>
      !/TYPESAFE|FACTORY|AI_GATEWAY|VERCEL|LLM_JUDGE|JEV_|ANTI_SLOP|TOKEN|SECRET|PASSWORD|API_KEY|^CI$|^NODE_OPTIONS$/.test(
        key,
      ),
  ),
);

env.TMPDIR = scratch;

env.GIT_CEILING_DIRECTORIES = scratch;

env.PATH = `${resolve('node_modules/.bin')}:${env.PATH}`;

env.NODE_OPTIONS = `--require=${resolve('tests/lint/network-guard.cjs')}`;

const suites = readdirSync('tools/oxlint/anti-slop', { recursive: true })
  .filter((path) => path.endsWith('.test.ts'))
  .sort()
  .map((path) => `tools/oxlint/anti-slop/${path}`);

suites.push('tests/lint/integration.test.mjs');

for (const suite of suites) {
  const result = spawnSync(process.execPath, [suite], {
    env,
    encoding: 'utf8',
    maxBuffer: 8 * 1024 * 1024,
    timeout: 120_000,
  });

  assert.equal(
    result.status,
    0,
    `${suite}\n${result.error ?? ''}\n${result.stdout}\n${result.stderr}`,
  );
  console.log(`PASS ${suite}`);
}

console.log(`Passed ${suites.length} offline anti-slop suites.`);
