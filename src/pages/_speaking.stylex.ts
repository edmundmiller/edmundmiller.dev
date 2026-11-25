import * as stylex from '@stylexjs/stylex';
import { colors, effects } from '../styles/tokens.stylex';

const medium = '@media (min-width: 768px)';
const large = '@media (min-width: 1024px)';

export const styles = stylex.create({
  page: {
    marginInline: 'auto',
    paddingBlock: {
      default: '3rem',
      [large]: '4rem',
    },
    paddingInline: {
      default: '1rem',
      [medium]: '1.5rem',
    },
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '2rem',
  },
  pageTitle: {
    fontSize: {
      default: '1.875rem',
      '@media (min-width: 640px)': '2.25rem',
    },
    fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: {
      default: '2.25rem',
      '@media (min-width: 640px)': '2.5rem',
    },
  },
  introduction: {
    color: {
      default: colors.subtle,
      ':is([data-theme="dark"] *)': colors.mutedDark,
    },
    marginTop: '0.5rem',
  },
  talkList: {
    gap: '1.5rem',
    display: 'grid',
  },
  talk: {
    padding: '1.5rem',
    borderColor: {
      default: colors.border,
      ':is([data-theme="dark"] *)': colors.borderDark,
    },
    borderRadius: '0.5rem',
    borderStyle: 'solid',
    borderWidth: '1px',
    backgroundColor: {
      default: colors.panel,
      ':is([data-theme="dark"] *)': colors.panelDark,
    },
    boxShadow: effects.panelShadow,
  },
  talkMeta: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  metadata: {
    color: {
      default: colors.subtle,
      ':is([data-theme="dark"] *)': colors.mutedDark,
    },
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
  },
  videoLink: {
    textDecoration: {
      default: 'none',
      ':hover': 'underline',
    },
    color: {
      default: colors.strong,
      ':is([data-theme="dark"] *)': colors.strongDark,
    },
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
  },
  talkContent: {
    marginTop: '1rem',
  },
  talkTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
    lineHeight: '1.75rem',
  },
  talkTitleText: {
    color: {
      default: colors.strong,
      ':is([data-theme="dark"] *)': colors.strongDark,
    },
  },
  talkTitleLink: {
    textDecoration: {
      default: 'none',
      ':hover': 'underline',
    },
    color: {
      default: colors.strong,
      ':is([data-theme="dark"] *)': colors.strongDark,
    },
  },
  event: {
    color: {
      default: colors.subtle,
      ':is([data-theme="dark"] *)': colors.mutedDark,
    },
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    marginTop: '0.25rem',
  },
  description: {
    color: {
      default: colors.muted,
      ':is([data-theme="dark"] *)': colors.descriptionDark,
    },
    marginTop: '0.75rem',
  },
  emptyState: {
    padding: '2rem',
    borderColor: {
      default: colors.descriptionDark,
      ':is([data-theme="dark"] *)': colors.emptyBorderDark,
    },
    borderRadius: '0.5rem',
    borderStyle: 'dashed',
    borderWidth: '1px',
    textAlign: 'center',
  },
  emptyStateText: {
    color: {
      default: colors.subtle,
      ':is([data-theme="dark"] *)': colors.mutedDark,
    },
  },
  cactusLink: {
    backgroundPosition: 'bottom',
    backgroundImage: {
      default: effects.cactusUnderline,
      ':hover': effects.cactusUnderlineHover,
    },
    backgroundRepeat: 'repeat-x',
    backgroundSize: '100% 6px',
  },
});
