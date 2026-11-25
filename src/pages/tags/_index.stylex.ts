import * as stylex from '@stylexjs/stylex';
import { colors, effects, fonts } from '../../styles/tokens.stylex';

export const styles = stylex.create({
  pageTitle: {
    color: colors.accent2,
    fontFamily: fonts.heading,
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: '2rem',
    marginBottom: '1.5rem',
  },
  tagList: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
  },
  tag: {
    alignItems: 'center',
    columnGap: '0.5rem',
    display: 'flex',
  },
  tagLink: {
    backgroundPosition: 'bottom',
    backgroundImage: {
      default: effects.cactusUnderline,
      ':hover': effects.cactusUnderlineHover,
    },
    backgroundRepeat: 'repeat-x',
    backgroundSize: '100% 6px',
    display: 'inline-block',
  },
  count: {
    display: 'inline-block',
  },
});
