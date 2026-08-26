import * as stylex from '@stylexjs/stylex';
import { colors, motion } from '../styles/tokens.stylex';

const small = '@media (min-width: 640px)';

export const styles = stylex.create({
  search: {
    marginInlineStart: 'auto',
  },
  openButton: {
    borderRadius: '0.375rem',
    alignItems: 'center',
    boxShadow: {
      default: 'none',
      ':hover': '0 0 0 2px #a1a1aa',
    },
    display: 'flex',
    justifyContent: 'center',
    transitionDuration: motion.fast,
    transitionProperty: 'all',
    height: '2.25rem',
    width: '2.25rem',
  },
  searchIcon: {
    height: '1.75rem',
    width: '1.75rem',
  },
  dialog: {
    borderColor: '#a1a1aa',
    borderRadius: {
      default: 0,
      [small]: '0.375rem',
    },
    borderStyle: 'solid',
    borderWidth: '1px',
    marginInline: {
      default: 0,
      [small]: 'auto',
    },
    backdropFilter: {
      default: 'none',
      '::backdrop': 'blur(8px)',
    },
    backgroundColor: colors.background,
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    marginBlockEnd: {
      default: 0,
      [small]: 'auto',
    },
    marginBlockStart: {
      default: 0,
      [small]: '4rem',
    },
    height: {
      default: '100%',
      [small]: 'max-content',
    },
    maxHeight: {
      default: '100%',
      [small]: 'calc(100% - 8rem)',
    },
    maxWidth: {
      default: '100%',
      [small]: '48rem',
    },
    minHeight: {
      default: 0,
      [small]: '15rem',
    },
    width: {
      default: '100%',
      [small]: '83.333333%',
    },
  },
  dialogFrame: {
    padding: '1.5rem',
    gap: '1rem',
    display: 'flex',
    flexDirection: 'column',
    paddingBlockStart: {
      default: '3rem',
      [small]: '1.5rem',
    },
  },
  closeButton: {
    padding: '0.5rem',
    borderRadius: '0.375rem',
    backgroundColor: {
      default: '#e4e4e7',
      ':is([data-theme="dark"] *)': '#3f3f46',
    },
    cursor: 'pointer',
    fontWeight: 600,
    marginInlineStart: 'auto',
  },
  developmentMessage: {
    marginInline: 'auto',
    textAlign: 'center',
  },
});
