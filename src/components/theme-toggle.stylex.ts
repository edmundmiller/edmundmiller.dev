import * as stylex from '@stylexjs/stylex';
import { motion } from '../styles/tokens.stylex';

const small = '@media (min-width: 640px)';

export const styles = stylex.create({
  toggle: {
    marginInlineStart: {
      default: '0.5rem',
      [small]: '1rem',
    },
  },
  button: {
    padding: '0.5rem',
    borderRadius: '0.375rem',
    boxShadow: {
      default: 'none',
      ':hover': '0 0 0 2px #a1a1aa',
    },
    position: 'relative',
    transitionDuration: motion.fast,
    transitionProperty: 'all',
    height: '2.25rem',
    width: '2.25rem',
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
  icon: {
    insetInlineStart: '50%',
    position: 'absolute',
    transitionDuration: motion.fast,
    transitionProperty: 'all',
    height: '1.75rem',
    top: '50%',
    width: '1.75rem',
  },
  sunIcon: {
    opacity: {
      default: 1,
      ':is([data-theme="dark"] *)': 0,
    },
    transform: {
      default: 'translate(-50%, -50%) scale(1)',
      ':is([data-theme="dark"] *)': 'translate(-50%, -50%) scale(0)',
    },
  },
  moonIcon: {
    opacity: {
      default: 0,
      ':is([data-theme="dark"] *)': 1,
    },
    transform: {
      default: 'translate(-50%, -50%) scale(0)',
      ':is([data-theme="dark"] *)': 'translate(-50%, -50%) scale(1)',
    },
  },
});
