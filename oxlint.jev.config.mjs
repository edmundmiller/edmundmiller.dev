import base from './.oxlintrc.json' with { type: 'json' };
import {
  effectSourceJevRules,
  effectTestJevRules,
} from './tools/oxlint/anti-slop/jev/effect-rules.ts';
import { martinFowlerJevRules } from './tools/oxlint/anti-slop/martinfowler/jev-rules.ts';

const sourceRules = Object.fromEntries(
  effectSourceJevRules.map(({ id }) => [`anti-slop-effect-jev/${id}`, 'error']),
);

const smellRules = Object.fromEntries(
  martinFowlerJevRules.map(({ id }) => [`anti-slop-martinfowler-jev/${id}`, 'warn']),
);

const overrides = base.overrides ?? [];

// Spread rather than extends: relative JS plugin paths and ignores must survive the overlay.
export default {
  ...base,
  jsPlugins: [
    ...base.jsPlugins,
    { name: 'anti-slop-effect-jev', specifier: './tools/oxlint/anti-slop/jev/plugin.ts' },
    {
      name: 'anti-slop-martinfowler-jev',
      specifier: './tools/oxlint/anti-slop/martinfowler/jev-plugin.ts',
    },
  ],
  rules: { ...base.rules, ...sourceRules, ...smellRules },
  overrides: [
    ...overrides,
    {
      files: ['**/*.test.*', '**/*.spec.*', 'test/**', 'tests/**'],
      rules: {
        ...Object.fromEntries(
          Object.keys({ ...sourceRules, ...smellRules }).map((id) => [id, 'off']),
        ),
        ...Object.fromEntries(
          effectTestJevRules.map(({ id }) => [`anti-slop-effect-jev/${id}`, 'error']),
        ),
      },
    },
  ],
};
