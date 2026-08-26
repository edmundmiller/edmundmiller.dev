import * as stylex from '@stylexjs/stylex';
import { colors } from '../styles/tokens.stylex';

const pointer = '@media (hover: hover) and (min-width: 640px)';

export const styles = stylex.create({
  navigation: {
    alignItems: 'center',
    columnGap: '1rem',
    display: 'flex',
    marginTop: '2rem',
  },
  previousLink: {
    paddingBlock: '0.5rem',
    color: {
      default: 'inherit',
      [pointer]: {
        ':hover': colors.accent,
      },
    },
    marginInlineEnd: 'auto',
  },
  nextLink: {
    paddingBlock: '0.5rem',
    color: {
      default: 'inherit',
      [pointer]: {
        ':hover': colors.accent,
      },
    },
    marginInlineStart: 'auto',
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
