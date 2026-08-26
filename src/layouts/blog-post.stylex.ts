import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../styles/tokens.stylex';

const small = '@media (min-width: 640px)';
const large = '@media (min-width: 1024px)';

export const styles = stylex.create({
  article: {
    flexGrow: 1,
    overflowWrap: 'break-word',
  },
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
  backToTop: {
    borderColor: {
      default: 'transparent',
      ':hover': '#a1a1aa',
    },
    borderRadius: '9999px',
    borderStyle: 'solid',
    borderWidth: '2px',
    alignItems: 'center',
    backgroundColor: {
      default: '#e4e4e7',
      ':is([data-theme="dark"] *)': '#3f3f46',
    },
    display: 'flex',
    fontSize: '1.875rem',
    insetInlineEnd: {
      default: '1rem',
      [small]: '2rem',
    },
    justifyContent: 'center',
    opacity: {
      default: 0,
      ':is([data-show="true"])': 1,
    },
    position: 'fixed',
    transform: {
      default: 'translateY(7rem)',
      ':is([data-show="true"])': 'translateY(0)',
    },
    transitionDuration: '300ms',
    transitionProperty: 'all',
    zIndex: 90,
    bottom: '2rem',
    height: {
      default: '2.5rem',
      [small]: '3rem',
    },
    width: {
      default: '2.5rem',
      [small]: '3rem',
    },
  },
  backToTopIcon: {
    height: '1.5rem',
    width: '1.5rem',
  },
  cactusLink: {
    backgroundPosition: 'bottom',
    backgroundImage: {
      default:
        'linear-gradient(transparent, transparent 5px, hsl(var(--theme-text)) 5px, hsl(var(--theme-text)))',
      ':hover':
        'linear-gradient(transparent, transparent 4px, hsl(var(--theme-link)) 4px, hsl(var(--theme-link)))',
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
      default: '#6b7280',
      ':is([data-theme="dark"] *)': '#9ca3af',
    },
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    marginInlineStart: '0.5rem',
  },
  date: {
    fontWeight: 600,
  },
  heroTitle: {
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
  metaRow: {
    alignItems: 'center',
    columnGap: '0.75rem',
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: '0.5rem',
  },
  prose: {
    marginTop: '3rem',
  },
  shell: {
    alignItems: {
      default: 'normal',
      [large]: 'flex-start',
    },
    columnGap: '2.5rem',
    display: {
      default: 'block',
      [large]: 'flex',
    },
  },
});
