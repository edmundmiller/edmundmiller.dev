import stylex from '@stylexjs/eslint-plugin';

// The site's existing rhythm, including optical half-steps.
const space = [
  0,
  '0',
  '0px',
  '0.125rem',
  '0.25rem',
  '0.375rem',
  '0.5rem',
  '0.75rem',
  '1rem',
  '1.25rem',
  '1.5rem',
  '2rem',
  '2.5rem',
  '3rem',
  '4rem',
  '5rem',
  '7rem',
];

export default [
  {
    files: ['src/**/*.stylex.{ts,tsx}'],
    plugins: {
      '@stylexjs': stylex,
    },
    rules: {
      '@stylexjs/no-legacy-contextual-styles': 'error',
      '@stylexjs/no-unused': 'error',
      '@stylexjs/sort-keys': 'error',
      '@stylexjs/valid-shorthands': 'error',
      '@stylexjs/valid-styles': [
        'error',
        {
          allowRawCSSVars: false,
          propLimits: {
            'margin*': { limit: [...space, 'auto', '-1px', '-0.5rem', '-1rem', '-8rem'] },
            'padding*': { limit: space },
            gap: { limit: space },
            rowGap: { limit: space },
            columnGap: { limit: space },
            color: { limit: ['transparent', 'currentColor', 'inherit'] },
            '*Color': { limit: ['transparent', 'currentColor', 'inherit'] },
            boxShadow: { limit: ['none'] },
            backgroundImage: { limit: ['none'] },
          },
        },
      ],
    },
  },
];
