import * as stylex from '@stylexjs/stylex';

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
      default: '#6b7280',
      ':is([data-theme="dark"] *)': '#9ca3af',
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
      default: '#e5e7eb',
      ':is([data-theme="dark"] *)': '#1f2937',
    },
    borderRadius: '0.5rem',
    borderStyle: 'solid',
    borderWidth: '1px',
    backgroundColor: {
      default: '#ffffff',
      ':is([data-theme="dark"] *)': '#030712',
    },
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  },
  talkMeta: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  metadata: {
    color: {
      default: '#6b7280',
      ':is([data-theme="dark"] *)': '#9ca3af',
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
      default: '#111827',
      ':is([data-theme="dark"] *)': '#f9fafb',
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
      default: '#111827',
      ':is([data-theme="dark"] *)': '#f9fafb',
    },
  },
  talkTitleLink: {
    textDecoration: {
      default: 'none',
      ':hover': 'underline',
    },
    color: {
      default: '#111827',
      ':is([data-theme="dark"] *)': '#f9fafb',
    },
  },
  event: {
    color: {
      default: '#6b7280',
      ':is([data-theme="dark"] *)': '#9ca3af',
    },
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    marginTop: '0.25rem',
  },
  description: {
    color: {
      default: '#4b5563',
      ':is([data-theme="dark"] *)': '#d1d5db',
    },
    marginTop: '0.75rem',
  },
  emptyState: {
    padding: '2rem',
    borderColor: {
      default: '#d1d5db',
      ':is([data-theme="dark"] *)': '#374151',
    },
    borderRadius: '0.5rem',
    borderStyle: 'dashed',
    borderWidth: '1px',
    textAlign: 'center',
  },
  emptyStateText: {
    color: {
      default: '#6b7280',
      ':is([data-theme="dark"] *)': '#9ca3af',
    },
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
  },
});
