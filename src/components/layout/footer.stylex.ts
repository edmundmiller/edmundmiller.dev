import * as stylex from '@stylexjs/stylex';
import { colors } from '../../styles/tokens.stylex';

const small = '@media (min-width: 640px)';
const smallPointer = '@media (hover: hover) and (min-width: 640px)';

export const styles = stylex.create({
  footer: {
    alignItems: 'center',
    color: {
      default: '#4b5563',
      ':is([data-theme="dark"] *)': '#9ca3af',
    },
    display: 'flex',
    flexDirection: {
      default: 'column',
      [small]: 'row',
    },
    fontSize: {
      default: '1rem',
      [small]: '0.75rem',
    },
    fontWeight: 600,
    justifyContent: {
      default: 'center',
      [small]: 'space-between',
    },
    lineHeight: {
      default: '1.5rem',
      [small]: '1rem',
    },
    paddingBlockEnd: '1rem',
    paddingBlockStart: '5rem',
    rowGap: '0.5rem',
    textAlign: 'center',
    verticalAlign: 'top',
    marginTop: 'auto',
    width: '100%',
  },
  copyright: {
    marginInlineEnd: {
      default: 0,
      [small]: '1rem',
    },
  },
  credit: {
    display: 'inline-block',
  },
  navigation: {
    columnGap: {
      default: '0.5rem',
      [small]: 0,
    },
    display: 'flex',
  },
  navigationLink: {
    paddingBlock: {
      default: '0.5rem',
      [small]: 0,
    },
    paddingInline: '1rem',
    textDecoration: {
      default: 'none',
      [smallPointer]: {
        ':hover': 'underline',
      },
    },
    borderInlineStartColor: {
      default: 'transparent',
      [small]: '#6b7280',
    },
    borderInlineStartStyle: {
      default: 'none',
      [small]: 'solid',
    },
    borderInlineStartWidth: {
      default: 0,
      [small]: '1px',
      ':first-child': 0,
    },
    color: {
      default: 'inherit',
      [smallPointer]: {
        ':hover': colors.text,
      },
    },
  },
});
