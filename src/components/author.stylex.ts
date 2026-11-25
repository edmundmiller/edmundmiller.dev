import * as stylex from '@stylexjs/stylex';
import { colors, effects } from '../styles/tokens.stylex';

export const styles = stylex.create({
  author: {
    alignItems: 'center',
    columnGap: '0.5rem',
    display: 'flex',
  },
  avatar: {
    borderRadius: '9999px',
  },
  avatarLarge: {
    height: '3rem',
    width: '3rem',
  },
  avatarMedium: {
    height: '2rem',
    width: '2rem',
  },
  avatarSmall: {
    height: '1.5rem',
    width: '1.5rem',
  },
  bio: {
    color: {
      default: colors.muted,
      ':is([data-theme="dark"] *)': colors.mutedDark,
    },
    fontSize: '0.75rem',
    lineHeight: '1rem',
    marginTop: '0.25rem',
    maxWidth: '20rem',
  },
  displayName: {
    color: colors.accent2,
    marginInlineStart: '0.25rem',
  },
  profileLink: {
    backgroundPosition: 'bottom',
    backgroundImage: {
      default: effects.cactusUnderline,
      ':hover': effects.cactusUnderlineHover,
    },
    backgroundRepeat: 'repeat-x',
    backgroundSize: '100% 6px',
    color: {
      default: 'inherit',
      ':hover': colors.link,
      ':focus': colors.link,
    },
    fontWeight: 600,
  },
  textLarge: {
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
  },
  textMedium: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
  textSmall: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
});
