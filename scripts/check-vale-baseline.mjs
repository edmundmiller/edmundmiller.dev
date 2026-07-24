import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const baselinePath = process.env.VALE_BASELINE ?? 'tests/vale/site-baseline.json';
const vale = spawnSync(
  'vale',
  ['--no-global', '--config=.vale.ini', '--output=JSON', '--no-exit', 'src/'],
  { encoding: 'utf8' },
);

if (vale.error) throw vale.error;
if (vale.status !== 0) {
  process.stderr.write(vale.stderr || `Vale exited with status ${vale.status}.\n`);
  process.exit(vale.status ?? 1);
}

const countAlerts = (alertsByFile) =>
  Object.fromEntries(
    Object.entries(alertsByFile)
      .filter(([, alerts]) => alerts.length > 0)
      .map(([file, alerts]) => [
        file,
        Object.fromEntries(
          Object.entries(Object.groupBy(alerts, (alert) => alert.Check)).map(([check, matches]) => [
            check,
            matches.length,
          ]),
        ),
      ]),
  );

const sortCounts = (counts) =>
  Object.fromEntries(
    Object.entries(counts)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([file, checks]) => [
        file,
        Object.fromEntries(
          Object.entries(checks).sort(([left], [right]) => left.localeCompare(right)),
        ),
      ]),
  );

const current = sortCounts(countAlerts(JSON.parse(vale.stdout)));

if (process.argv.includes('--write')) {
  writeFileSync(baselinePath, `${JSON.stringify(current, null, 2)}\n`);
  process.stdout.write(`Wrote Vale baseline for ${Object.keys(current).length} files.\n`);
  process.exit();
}
const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
const differences = [];

const files = new Set([...Object.keys(baseline), ...Object.keys(current)]);
for (const file of [...files].sort((left, right) => left.localeCompare(right))) {
  const expectedChecks = baseline[file] ?? {};
  const actualChecks = current[file] ?? {};
  const checks = new Set([...Object.keys(expectedChecks), ...Object.keys(actualChecks)]);

  for (const check of [...checks].sort((left, right) => left.localeCompare(right))) {
    const expected = expectedChecks[check] ?? 0;
    const actual = actualChecks[check] ?? 0;
    if (actual !== expected) {
      differences.push(`${file}: ${check} (expected ${expected}, found ${actual})`);
    }
  }
}

if (differences.length > 0) {
  process.stderr.write(
    `Vale baseline changed:\n${differences.join('\n')}\nRun \`pnpm lint:prose:baseline\` after reviewing intentional prose changes.\n`,
  );
  process.exitCode = 1;
} else {
  const total = Object.values(current)
    .flatMap(Object.values)
    .reduce((sum, count) => sum + count, 0);
  process.stdout.write(
    `Vale baseline unchanged: ${total} suggestions across ${Object.keys(current).length} files.\n`,
  );
}
