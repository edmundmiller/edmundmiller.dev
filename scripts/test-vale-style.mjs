import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const fixturesRoot = join(root, 'tests/vale');
const vale = process.env.VALE ?? 'vale';

const version = spawnSync(vale, ['--version'], { encoding: 'utf8' });
if (version.error || version.status !== 0) {
  throw new Error('Vale is not installed. Run `.agents/setup`.');
}

if (!existsSync(fixturesRoot)) {
  process.stdout.write('Vale test harness ready; no rule fixtures installed.\n');
  process.exit();
}

for (const rule of readdirSync(fixturesRoot).sort()) {
  const ruleRoot = join(fixturesRoot, rule);
  const casesPath = join(ruleRoot, 'cases.json');
  if (!existsSync(casesPath)) continue;

  const cases = JSON.parse(readFileSync(casesPath, 'utf8'));
  for (const testCase of cases) {
    const fixture = join(ruleRoot, testCase.fixture);
    const result = spawnSync(
      vale,
      ['--no-global', `--config=${join(root, '.vale.ini')}`, '--output=JSON', '--no-exit', fixture],
      {
        cwd: root,
        encoding: 'utf8',
        env: { ...process.env, PATH: `${join(root, 'node_modules/.bin')}:${process.env.PATH}` },
      },
    );

    if (result.error) throw result.error;
    if (result.status !== 0) {
      throw new Error(`Vale failed for ${rule}/${testCase.fixture}: ${result.stderr}`);
    }

    const alerts = Object.values(JSON.parse(result.stdout)).flat();
    const foreignRules = alerts.filter((alert) => alert.Check !== `WriteSimply.${rule}`);
    if (foreignRules.length > 0) {
      throw new Error(
        `${rule}/${testCase.fixture} unexpectedly triggered ${foreignRules.map((alert) => alert.Check).join(', ')}`,
      );
    }
    if (alerts.length !== testCase.count) {
      throw new Error(
        `${rule}/${testCase.fixture}: expected ${testCase.count} alerts, found ${alerts.length}`,
      );
    }
    for (const message of testCase.messages ?? []) {
      if (!alerts.some((alert) => alert.Message === message)) {
        throw new Error(`${rule}/${testCase.fixture}: missing message ${JSON.stringify(message)}`);
      }
    }
  }
}

process.stdout.write('WriteSimply fixtures passed.\n');
