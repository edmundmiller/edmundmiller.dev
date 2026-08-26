import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../styles/tokens.stylex';

export const styles = stylex.create({
  summary: {
    color: colors.accent2,
    marginBottom: 0,
  },
  list: {
    listStyle: 'none',
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap',
    paddingInlineStart: '0.5rem',
  },
  item: {
    marginInlineStart: '-0.5rem',
  },
  profileLink: {
    borderRadius: '9999px',
    overflow: 'hidden',
    boxShadow: {
      default: '0 0 0 2px hsl(var(--theme-text))',
      ':focus-visible': '0 0 0 4px hsl(var(--theme-link))',
      ':hover': '0 0 0 4px hsl(var(--theme-link))',
    },
    display: 'inline-block',
    outlineColor: 'transparent',
    outlineOffset: '2px',
    outlineStyle: 'solid',
    outlineWidth: '2px',
    position: 'relative',
    zIndex: {
      default: 'auto',
      ':focus-visible': 10,
      ':hover': 10,
    },
  },
  avatar: {
    marginBlock: 0,
    display: 'inline-block',
    height: '3rem',
    width: '3rem',
  },
});
