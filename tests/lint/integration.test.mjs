import assert from 'node:assert/strict';
import { execFile, spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';
import { pathToFileURL } from 'node:url';

import base from '../../.oxlintrc.json' with { type: 'json' };
import semantic from '../../oxlint.jev.config.mjs';
import strict from '../../oxlint.strict.config.mjs';
import corePlugin from '../../tools/oxlint/anti-slop/index.ts';
import effectPlugin from '../../tools/oxlint/anti-slop/effect/index.ts';
import { martinFowlerJevRules } from '../../tools/oxlint/anti-slop/martinfowler/jev-rules.ts';

const root = resolve('.');

const scratch = resolve('.amp/in/orb-backup/anti-slop-tests');

mkdirSync(scratch, { recursive: true });

const fixture = mkdtempSync(join(scratch, 'integration-'));

const helpers = mkdtempSync(join(scratch, 'helpers-'));

const oxlint = resolve('node_modules/.bin/oxlint');

const runner = resolve('tools/oxlint/anti-slop/jev/lint-changed.ts');

const audit = join(helpers, 'network.log');

writeFileSync(audit, '');

const env = {
  ...process.env,
  CI: '1',
  TYPESAFE_API_KEY: 'fake-offline-only',
  FACTORY_API_KEY: 'fake-offline-only',
  AI_GATEWAY_API_KEY: 'fake-offline-only',
  ANTI_SLOP_NETWORK_AUDIT: audit,
};

function run(command, args, cwd = root, extraEnv = {}) {
  return spawnSync(command, args, {
    cwd,
    env: { ...env, ...extraEnv },
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
    timeout: 60_000,
  });
}

assert.ok(process.env.NODE_OPTIONS?.includes('network-guard.cjs'), 'run via pnpm test:lint');

const blocked = run(process.execPath, [
  '-e',
  'try { fetch("https://offline.invalid"); } catch (error) { console.log(error.message); }',
]);

assert.match(blocked.stdout, /External network is disabled/);

assert.equal(readFileSync(audit, 'utf8'), 'blocked external network attempt\n');

writeFileSync(audit, '');

// Staged adoption preserves a green ordinary command, even with ambient fake provider keys.
const ordinary = run('pnpm', ['lint', '--threads', '2', '--format', 'json']);

assert.equal(ordinary.signal, null, ordinary.stderr);

assert.equal(ordinary.status, 0, `${ordinary.stdout}\n${ordinary.stderr}`);

assert.match(ordinary.stdout, /"diagnostics"/);

assert.doesNotMatch(
  `${ordinary.stdout}\n${ordinary.stderr}`,
  /oxlint-plugin-jev:|External network/,
);

assert.equal(readFileSync(audit, 'utf8'), '');

assert.ok(base.jsPlugins.every(({ name }) => !name.includes('jev')));

assert.ok(Object.keys(base.rules).every((name) => !name.includes('jev')));

assert.deepEqual(base.categories, { correctness: 'error', suspicious: 'warn', perf: 'warn' });

assert.equal(base.rules['eslint/no-await-in-loop'], 'off');

for (const name of [
  'eslint/no-new',
  'eslint/no-underscore-dangle',
  'typescript/no-extraneous-class',
  'unicorn/consistent-function-scoping',
  'unicorn/no-array-sort',
  'unicorn/prefer-set-has',
]) {
  assert.equal(base.rules[name], 'off');
}

assert.deepEqual(base.rules['eslint/no-unused-vars'], [
  'warn',
  { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_', varsIgnorePattern: '^Props$' },
]);

for (const [name, value] of Object.entries(base.rules)) {
  assert.deepEqual(semantic.rules[name], value, `semantic overlay changed ${name}`);
}

assert.deepEqual(semantic.ignorePatterns, base.ignorePatterns);

assert.deepEqual(semantic.jsPlugins.slice(0, base.jsPlugins.length), base.jsPlugins);

assert.deepEqual(strict.jsPlugins, base.jsPlugins);

assert.deepEqual(strict.ignorePatterns, base.ignorePatterns);

for (const [name, value] of Object.entries(base.rules)) {
  assert.deepEqual(strict.rules[name], value, `strict proposal changed existing ${name}`);
}

for (const [name, plugin] of [
  ['anti-slop', corePlugin],
  ['anti-slop-effect', effectPlugin],
]) {
  for (const id of Object.keys(plugin.rules)) {
    const severity = strict.rules[`${name}/${id}`];
    assert.equal(Array.isArray(severity) ? severity[0] : severity, 'error');
  }
}

assert.deepEqual(strict.rules['anti-slop/max-ternary-depth'], ['error', { maxDepth: 2 }]);

assert.equal(base.rules['anti-slop-effect/no-test-code-in-src'], undefined);

assert.equal(strict.rules['anti-slop-effect/no-test-code-in-src'], 'error');

const proposal = run('pnpm', ['lint:strict', '--threads', '2', '--format', 'json']);

assert.equal(proposal.status, 1, `${proposal.stdout}\n${proposal.stderr}`);

assert.match(proposal.stdout, /anti-slop-effect\(no-test-code-in-src\)/);

assert.doesNotMatch(
  `${proposal.stdout}\n${proposal.stderr}`,
  /oxlint-plugin-jev:|External network/,
);

assert.equal(readFileSync(audit, 'utf8'), '');

const withoutKeys = run('pnpm', ['lint', '--threads', '2', '--format', 'json'], root, {
  TYPESAFE_API_KEY: '',
  FACTORY_API_KEY: '',
  AI_GATEWAY_API_KEY: '',
});

assert.equal(withoutKeys.status, ordinary.status);

assert.doesNotMatch(
  `${withoutKeys.stdout}\n${withoutKeys.stderr}`,
  /oxlint-plugin-jev:|External network/,
);

const check = run('pnpm', ['check']);

assert.equal(check.status, 0, `${check.stdout}\n${check.stderr}`);

assert.equal(readFileSync(audit, 'utf8'), '');

function git(...args) {
  const result = run(
    'git',
    [
      '-c',
      'user.name=Offline Test',
      '-c',
      'user.email=test@example.com',
      '-c',
      'commit.gpgsign=false',
      ...args,
    ],
    fixture,
  );

  assert.equal(result.status, 0, result.stderr);
}

git('init', '-q', '-b', 'main');

writeFileSync(join(fixture, '.gitignore'), 'ignored.ts\n');

const unchangedFunction =
  'export function unchangedFunction() { return "UNCHANGED_FUNCTION_SENTINEL"; }\n';

writeFileSync(
  join(fixture, 'changed.ts'),
  `export function changedFunction() { return "CHANGED_FUNCTION_SENTINEL_1"; }\n\n${unchangedFunction}`,
);

writeFileSync(join(fixture, 'stable.ts'), 'export const stable = "UNCHANGED_FILE_SENTINEL";\n');

writeFileSync(join(fixture, 'staged.ts'), 'export const staged = 1;\n');

writeFileSync(join(fixture, 'deleted.ts'), 'export const deleted = 1;\n');

writeFileSync(join(fixture, 'example.test.ts'), 'export const example = 1;\n');

git('add', '.');

git('commit', '-qm', 'baseline history sentinel');

writeFileSync(
  join(fixture, 'changed.ts'),
  `export function changedFunction() { return "CHANGED_FUNCTION_SENTINEL_2"; }\n\n${unchangedFunction}`,
);

writeFileSync(join(fixture, 'staged.ts'), 'export const staged = 2;\n');

git('add', 'staged.ts');

git('rm', '-q', 'deleted.ts');

writeFileSync(join(fixture, 'new.ts'), 'export const fresh = 3;\n');

writeFileSync(join(fixture, 'ignored.ts'), 'export const ignored = 4;\n');

writeFileSync(join(fixture, 'example.test.ts'), 'export const example = 2;\n');

// Inspect the runner's public subprocess contract without starting any model plugin.
const capture = join(helpers, 'capture.json');

const stub = join(helpers, 'oxlint-stub.mjs');

writeFileSync(
  stub,
  `#!${process.execPath}\nimport { writeFileSync } from 'node:fs';\nwriteFileSync(${JSON.stringify(capture)}, JSON.stringify({ args: process.argv.slice(2), changed: process.env.JEV_CHANGED_ONLY }));\n`,
  { mode: 0o755 },
);

const selected = run(process.execPath, [runner, `--oxlint=${stub}`, '--ext=.ts'], fixture);

assert.equal(selected.status, 0, selected.stderr);

assert.deepEqual(JSON.parse(readFileSync(capture, 'utf8')), {
  args: ['changed.ts', 'example.test.ts', 'new.ts', 'staged.ts'],
  changed: '1',
});

// File-target questions include untouched functions; function questions filter changed overlaps.
const requests = [];

const verdict = { probability: 0.01 };

const server = createServer(async (request, response) => {
  let body = '';

  for await (const chunk of request) body += chunk;

  const parsed = JSON.parse(body);
  requests.push(parsed);
  response.setHeader('content-type', 'application/json');
  response.end(
    JSON.stringify({
      model: 'local-mock',
      answers: Object.fromEntries(
        Object.keys(parsed.questions).map((id) => [
          id,
          { type: 'noul', noul: verdict.probability },
        ]),
      ),
    }),
  );
});

await new Promise((done) => server.listen(0, '127.0.0.1', done));

try {
  const config = join(helpers, 'semantic.config.mjs');
  writeFileSync(
    config,
    `import config from ${JSON.stringify(pathToFileURL(resolve('oxlint.jev.config.mjs')).href)};\nexport default {...config, jsPlugins: config.jsPlugins.map(plugin => ({...plugin, specifier: ${JSON.stringify(root)} + '/' + plugin.specifier}))};\n`,
  );

  const result = await promisify(execFile)(
    process.execPath,
    [runner, `--oxlint=${oxlint}`, '-c', config, '--threads', '1'],
    {
      cwd: fixture,
      env: { ...env, TYPESAFE_BASE_URL: `http://127.0.0.1:${server.address().port}` },
      timeout: 60_000,
    },
  );

  assert.doesNotMatch(result.stderr, /no Jev credentials|skipped|network:|timeout/);
  assert.equal(requests.length, 7, '3 source files × 2 plugins + 1 test-only request');
  const payload = JSON.stringify(requests);
  assert.match(payload, /UNCHANGED_FUNCTION_SENTINEL/);
  assert.doesNotMatch(payload, /UNCHANGED_FILE_SENTINEL/);

  for (const rule of martinFowlerJevRules.filter(({ target }) => target === 'function')) {
    const snippets = requests.flatMap(({ state, questions }) =>
      Object.values(questions)
        .filter(({ instructions }) => instructions.includes(rule.question))
        .map(({ instructions }) => state.snippets[instructions.match(/snippet "([^"]+)"/)[1]]),
    );

    assert.equal(snippets.length, 1, `${rule.id} must review only the changed function`);
    assert.match(snippets[0], /CHANGED_FUNCTION_SENTINEL_2/);
    assert.doesNotMatch(snippets[0], /UNCHANGED_FUNCTION_SENTINEL/);
  }

  const testRequest = requests.filter(({ state }) =>
    JSON.stringify(state).includes('export const example'),
  );

  assert.equal(testRequest.length, 1, 'source and smell questions must not run on test files');
  assert.equal(
    Object.keys(testRequest[0].questions).length,
    2,
    'test question plus location question',
  );

  verdict.probability = 0.99;
  writeFileSync(
    join(fixture, 'changed.ts'),
    `export function changedFunction() { return "CHANGED_FUNCTION_SENTINEL_3"; }\n\n${unchangedFunction}`,
  );
  await assert.rejects(
    promisify(execFile)(oxlint, ['-c', config, '--threads', '1', 'changed.ts'], {
      cwd: fixture,
      env: { ...env, TYPESAFE_BASE_URL: `http://127.0.0.1:${server.address().port}` },
      timeout: 60_000,
    }),
    (error) => {
      assert.equal(error.code, 1);
      assert.match(error.stdout, /error anti-slop-effect-jev\(/);
      assert.match(error.stdout, /warning anti-slop-martinfowler-jev\(/);

      return true;
    },
  );
} finally {
  server.closeAllConnections();
  await new Promise((done) => server.close(done));
}

// Diff review sends a change set, including context and history, to a local command only.
const prompt = join(helpers, 'diff-prompt.txt');

const judge = join(helpers, 'judge.mjs');

writeFileSync(
  judge,
  `import { readFileSync, writeFileSync } from 'node:fs';\nwriteFileSync(${JSON.stringify(prompt)}, readFileSync(0, 'utf8'));\nconsole.log(JSON.stringify({rules: ['shotgun-surgery','divergent-change','duplicated-code','scope-creep'].map(id => ({id,violation:false,confidence:0.99,evidence:'local mock',files:[]}))}));\n`,
);

const diff = run(
  process.execPath,
  [
    resolve('tools/oxlint/anti-slop/diff-rules/run.ts'),
    '--working',
    '--backend',
    'command',
    '--command',
    `${process.execPath} ${judge}`,
    '--json',
  ],
  fixture,
);

assert.equal(diff.status, 0, diff.stderr);

assert.match(readFileSync(prompt, 'utf8'), /baseline history sentinel/);

assert.match(readFileSync(prompt, 'utf8'), /UNCHANGED_FUNCTION_SENTINEL/);

assert.doesNotMatch(readFileSync(prompt, 'utf8'), /UNCHANGED_FILE_SENTINEL/);

assert.equal(readFileSync(audit, 'utf8'), '');

console.log(
  'PASS staged normal/strict policy; full intended strict severities; normal lint offline with fake keys; staged/unstaged/untracked selection; whole-file Jev scope; test override; local diff context/history',
);
