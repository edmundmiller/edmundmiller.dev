import * as stylex from '@stylexjs/stylex';
import { colors } from '../styles/tokens.stylex';

export const styles = stylex.create({
  root: { gap: '0.75rem', display: 'grid' },
  input: {
    padding: '0.75rem',
    borderColor: '#a1a1aa',
    borderRadius: '0.375rem',
    borderStyle: 'solid',
    borderWidth: '1px',
    backgroundColor: colors.background,
    color: colors.text,
    width: '100%',
  },
  results: { padding: 0, gap: '1.5rem', display: 'grid', listStyleType: 'none' },
  result: { gap: '0.5rem', display: 'grid' },
  link: { textDecoration: 'underline', fontWeight: 600 },
  excerpt: { fontSize: '0.875rem', lineHeight: 1.6 },
});
