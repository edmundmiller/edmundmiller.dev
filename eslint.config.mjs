import stylex from '@stylexjs/eslint-plugin';

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
      '@stylexjs/valid-styles': 'error',
    },
  },
];
