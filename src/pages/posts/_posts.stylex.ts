import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../../styles/tokens.stylex';

const small = '@media (min-width: 640px)';
const smallPointer = '@media (hover: hover) and (min-width: 640px)';

export const styles = stylex.create({
  pageTitle: {
    color: colors.accent2,
    fontFamily: fonts.heading,
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: '2rem',
    marginBottom: '1.5rem',
  },
  pageGrid: {
    columnGap: {
      default: 0,
      [small]: '2rem',
    },
    display: 'grid',
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      [small]: '3fr 1fr',
    },
    rowGap: '4rem',
  },
  postList: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '2rem',
    textAlign: 'start',
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
  sidebarHeading: {
    alignItems: 'center',
    display: 'flex',
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: '1.75rem',
    marginBottom: '1rem',
  },
  tagIcon: {
    height: '1.5rem',
    width: '1.5rem',
  },
  tagList: {
    gap: '0.5rem',
    color: colors.background,
    display: 'flex',
    flexWrap: 'wrap',
  },
  tagLink: {
    padding: '0.25rem',
    borderRadius: '0.5rem',
    alignItems: 'center',
    backgroundColor: colors.accent,
    display: 'flex',
    justifyContent: 'center',
  },
  allTags: {
    display: 'block',
    textAlign: {
      default: 'start',
      [small]: 'end',
    },
    marginTop: '1rem',
  },
  allTagsLink: {
    color: {
      default: 'inherit',
      [smallPointer]: {
        ':hover': colors.accent,
      },
    },
  },
});
