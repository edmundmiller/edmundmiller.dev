import * as stylex from '@stylexjs/stylex';
import { colors } from '../../styles/tokens.stylex';

export const styles = stylex.create({
  anchor: {
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    color: {
      default: 'inherit',
      ':hover': colors.accent,
    },
    display: '-webkit-box',
  },
  childAnchor: {
    fontSize: '0.6875rem',
    marginTop: '0.5rem',
  },
  childItem: {
    marginInlineStart: '0.5rem',
  },
  sectionAnchor: {
    marginTop: '0.75rem',
  },
  marker: {
    marginInlineEnd: '0.125rem',
  },
});
