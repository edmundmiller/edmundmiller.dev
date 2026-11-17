import base from './.oxlintrc.json' with { type: 'json' };

// Staged adoption, not exemptions: conflicting incoming rules retain their intended severity here.
export default {
  ...base,
  rules: {
    ...base.rules,
    'anti-slop/max-ternary-depth': ['error', { maxDepth: 2 }],
    'anti-slop/no-array-filter-map': 'error',
    'anti-slop/no-conditional-spread': 'error',
    'anti-slop/no-known-value-widening': 'error',
    'anti-slop/no-runtime-typeof': 'error',
    'anti-slop/no-unknown-parameters': 'error',
    'anti-slop/no-unsafe-dictionary-type': 'error',
    'anti-slop/require-readable-spacing': 'error',
    'anti-slop/require-safety-comment-for-type-assertion': 'error',
    'anti-slop-effect/no-manual-tag-comparison': 'error',
    'anti-slop-effect/no-test-code-in-src': 'error',
    'anti-slop-effect/prefer-effect-match': 'error',
  },
};
