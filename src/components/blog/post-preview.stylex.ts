import * as stylex from '@stylexjs/stylex';
import { colors, motion } from '../../styles/tokens.stylex';

export const styles = stylex.create({
  date: {
    color: {
      default: '#4b5563',
      ':is([data-theme="dark"] *)': '#9ca3af',
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
      default: '#b91c1c',
      ':is([data-theme="dark"] *)': '#f87171',
    },
  },
  titleLink: {
    backgroundPosition: 'bottom',
    backgroundImage: {
      default:
        'linear-gradient(transparent, transparent 5px, hsl(var(--theme-text)) 5px, hsl(var(--theme-text)))',
      ':hover':
        'linear-gradient(transparent, transparent 4px, hsl(var(--theme-link)) 4px, hsl(var(--theme-link)))',
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
