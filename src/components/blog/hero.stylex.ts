import * as stylex from '@stylexjs/stylex';
import { colors, effects, fonts } from '../../styles/tokens.stylex';

const small = '@media (min-width: 640px)';

export const styles = stylex.create({
  authorIcon: {
    color: colors.accent,
    height: '1.25rem',
    width: '1.25rem',
  },
  authorItem: {
    alignItems: 'center',
    display: 'flex',
  },
  authorLabel: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
  },
  authorList: {
    alignItems: 'center',
    columnGap: '0.5rem',
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: '0.25rem',
  },
  authors: {
    alignItems: 'center',
    columnGap: '0.5rem',
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '0.75rem',
  },
  cactusLink: {
    backgroundPosition: 'bottom',
    backgroundImage: {
      default: effects.cactusUnderline,
      ':hover': effects.cactusUnderlineHover,
    },
    backgroundRepeat: 'repeat-x',
    backgroundSize: '100% 6px',
    fontWeight: 600,
    marginInlineStart: '0.25rem',
  },
  canonical: {
    alignItems: 'center',
    columnGap: '0.5rem',
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '0.75rem',
  },
  canonicalLabel: {
    fontWeight: 500,
  },
  canonicalText: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
  conjunction: {
    color: {
      default: colors.subtle,
      ':is([data-theme="dark"] *)': colors.mutedDark,
    },
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    marginInlineStart: '0.5rem',
  },
  cover: {
    aspectRatio: '16 / 9',
    position: 'relative',
    marginBottom: '1.5rem',
  },
  coverImage: {
    inset: 0,
    objectFit: 'cover',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  draft: {
    color: {
      default: colors.draft,
      ':is([data-theme="dark"] *)': colors.draftDark,
    },
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
  metaRow: {
    alignItems: 'center',
    columnGap: '0.75rem',
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: '0.5rem',
  },
  published: {
    fontWeight: 600,
  },
  tags: {
    marginTop: '0.75rem',
  },
  tagIcon: {
    display: 'inline-block',
    marginInlineEnd: '0.25rem',
    height: '1.5rem',
    width: '1.5rem',
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
    '::before': {
      content: '"#"',
    },
  },
  title: {
    color: colors.accent2,
    fontFamily: fonts.heading,
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: '2rem',
    marginBottom: {
      default: '0.75rem',
      [small]: '0.25rem',
    },
  },
  updated: {
    padding: '0.25rem',
    borderRadius: '0.5rem',
    backgroundColor: colors.updated,
    color: colors.quote,
  },
  updatedDate: {
    marginInlineStart: '0.25rem',
  },
});
