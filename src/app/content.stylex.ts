import * as stylex from '@stylexjs/stylex';
import { colors } from '../styles/tokens.stylex';

export const styles = stylex.create({
  copy: {
    borderRadius: '4px',
    paddingBlock: '0.25rem',
    paddingInline: '0.5rem',
    backgroundColor: colors.background,
    color: colors.text,
    fontSize: '0.75rem',
    marginBlockStart: '0.25rem',
  },
});
