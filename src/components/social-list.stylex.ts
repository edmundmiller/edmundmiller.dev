import * as stylex from '@stylexjs/stylex';
import { colors, motion } from '../styles/tokens.stylex';

const small = '@media (min-width: 640px)';

export const styles = stylex.create({
  socialList: {
    alignItems: 'flex-end',
    columnGap: '0.5rem',
    display: 'flex',
    flexWrap: 'wrap',
  },
  links: {
    flex: {
      default: '1 1 0%',
      [small]: '0 1 auto',
    },
    alignItems: 'center',
    columnGap: '0.5rem',
    display: 'flex',
  },
  item: {
    display: 'flex',
  },
  link: {
    padding: '0.25rem',
    borderRadius: '0.375rem',
    outline: {
      default: 'none',
      ':focus-visible': 'none',
    },
    boxShadow: {
      default: 'none',
      ':focus-visible': '0 0 0 2px hsl(var(--theme-accent) / 0.6)',
    },
    color: {
      default: colors.text,
      ':hover': colors.link,
    },
    display: 'inline-flex',
    transitionDuration: motion.normal,
    transitionProperty: 'color',
  },
  icon: {
    height: '1.75rem',
    width: '1.75rem',
  },
  accessibleLabel: {
    margin: '-1px',
    padding: 0,
    borderWidth: 0,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    position: 'absolute',
    whiteSpace: 'nowrap',
    height: '1px',
    width: '1px',
  },
});
