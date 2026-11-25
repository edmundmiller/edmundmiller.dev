import * as stylex from '@stylexjs/stylex';
import { colors, effects, motion } from '../../styles/tokens.stylex';

export const styles = stylex.create({
  date: {
    color: {
      default: colors.muted,
      ':is([data-theme="dark"] *)': colors.mutedDark,
    },
    minWidth: '120px',
  },
  description: {
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    display: '-webkit-box',
    fontStyle: 'italic',
  },
  draft: {
    color: {
      default: colors.draft,
      ':is([data-theme="dark"] *)': colors.draftDark,
    },
  },
  titleLink: {
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
    },
    transitionDuration: motion.normal,
    transitionProperty: 'color',
  },
});
