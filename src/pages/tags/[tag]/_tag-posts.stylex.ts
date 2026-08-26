import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../../../styles/tokens.stylex';

const small = '@media (min-width: 640px)';
const smallPointer = '@media (hover: hover) and (min-width: 640px)';

export const styles = stylex.create({
  pageTitle: {
    alignItems: 'center',
    color: colors.accent2,
    display: 'flex',
    fontFamily: fonts.heading,
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: '2rem',
    marginBottom: '1.5rem',
  },
  tagsLink: {
    textDecoration: {
      default: 'none',
      [smallPointer]: {
        ':hover': 'underline',
      },
    },
    color: {
      default: colors.accent,
      [smallPointer]: {
        ':hover': colors.accent,
      },
    },
  },
  separator: {
    marginInlineEnd: '0.75rem',
    marginInlineStart: '0.5rem',
  },
  tagName: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
  },
  postList: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '2rem',
  },
  post: {
    gap: '0.5rem',
    display: 'flex',
    flexDirection: {
      default: 'column',
      [small]: 'row',
    },
    flexWrap: 'wrap',
  },
});
