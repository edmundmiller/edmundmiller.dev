import * as stylex from '@stylexjs/stylex';
import { colors, fonts, motion } from '../../styles/tokens.stylex';

const small = '@media (min-width: 640px)';

export const styles = stylex.create({
  closeIcon: {
    color: colors.accent,
    opacity: {
      default: 0,
      ':is([data-open="true"])': 1,
    },
    transform: {
      default: 'translate(-50%, -50%) scale(0)',
      ':is([data-open="true"])': 'translate(-50%, -50%) scale(1)',
    },
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    paddingInlineStart: {
      default: 0,
      [small]: '4rem',
    },
    position: 'relative',
    marginBottom: '7rem',
  },
  homeLink: {
    alignItems: 'center',
    display: {
      default: 'inline-flex',
      [small]: 'inline-block',
    },
  },
  identity: {
    display: 'flex',
    flexDirection: {
      default: 'row',
      [small]: 'column',
    },
    position: {
      default: 'static',
      [small]: 'relative',
    },
  },
  menuButton: {
    display: {
      default: 'block',
      [small]: 'none',
    },
    marginInlineStart: '1rem',
    position: 'relative',
    height: '1.75rem',
    width: '1.75rem',
  },
  menuIcon: {
    insetInlineStart: '50%',
    opacity: {
      default: 1,
      ':is([data-open="true"])': 0,
    },
    position: 'absolute',
    transform: {
      default: 'translate(-50%, -50%) scale(1)',
      ':is([data-open="true"])': 'translate(-50%, -50%) scale(0)',
    },
    transitionDuration: motion.fast,
    transitionProperty: 'all',
    height: '100%',
    top: '50%',
    width: '100%',
  },
  menuLink: {
    paddingBlock: {
      default: '1rem',
      [small]: 0,
    },
    paddingInline: '1rem',
    textDecoration: {
      default: 'none',
      ':hover': 'underline',
    },
    borderInlineStartColor: {
      default: 'transparent',
      [small]: colors.accent,
    },
    borderInlineStartStyle: {
      default: 'none',
      [small]: 'dashed',
    },
    borderInlineStartWidth: {
      default: 0,
      [small]: '1px',
      ':first-child': 0,
    },
  },
  name: {
    fontFamily: fonts.heading,
    fontSize: {
      default: '1.25rem',
      [small]: '1.5rem',
    },
    fontWeight: 700,
  },
  navigation: {
    borderRadius: {
      default: '0.375rem',
      [small]: 0,
    },
    insetInline: {
      default: '-1rem',
      [small]: 'auto',
    },
    paddingBlock: {
      default: '1rem',
      [small]: 0,
    },
    alignItems: {
      default: 'flex-end',
      [small]: 'center',
    },
    backdropFilter: {
      default: 'blur(8px)',
      [small]: 'none',
    },
    backgroundColor: {
      default: 'color-mix(in srgb, hsl(var(--theme-bg)) 85%, transparent)',
      [small]: 'transparent',
    },
    boxShadow: {
      default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      [small]: 'none',
    },
    color: colors.accent,
    display: {
      default: 'none',
      [small]: 'flex',
      ':is([data-open="true"])': 'flex',
    },
    flexDirection: {
      default: 'column',
      [small]: 'row',
    },
    marginInlineStart: {
      default: 0,
      [small]: '-1rem',
    },
    position: {
      default: 'absolute',
      [small]: 'static',
    },
    rowGap: '1rem',
    zIndex: {
      default: 50,
      [small]: 'auto',
    },
    marginTop: {
      default: 0,
      [small]: '0.25rem',
    },
    top: {
      default: '3.5rem',
      [small]: 'auto',
    },
  },
});
