import * as stylex from '@stylexjs/stylex';
import { motion } from '../styles/tokens.stylex';

export const styles = stylex.create({
  body: {
    flexBasis: '0%',
    flexGrow: '1',
    flexShrink: '1',
    minWidth: 0,
  },
  chevron: {
    transform: {
      default: 'rotate(0deg)',
      ':is([data-expanded="false"])': 'rotate(-90deg)',
    },
    transitionDuration: motion.normal,
    transitionProperty: 'transform',
    height: '1rem',
    width: '1rem',
  },
  container: {
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBlock: '1.5rem',
    borderInlineStartStyle: 'solid',
    borderInlineStartWidth: '4px',
    boxShadow: {
      default: 'none',
      ':hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    },
    transitionDuration: motion.normal,
    transitionProperty: 'all',
  },
  content: {
    display: {
      default: 'block',
      ':is([data-expanded="false"])': 'none',
    },
  },
  contentCollapsible: {
    marginTop: '0.5rem',
  },
  dangerContainer: {
    backgroundColor: {
      default: '#fef2f2',
      ':is([data-theme="dark"] *)': 'rgb(69 10 10 / 0.3)',
    },
    borderInlineStartColor: {
      default: '#fecaca',
      ':is([data-theme="dark"] *)': '#991b1b',
    },
  },
  dangerIcon: {
    color: { default: '#dc2626', ':is([data-theme="dark"] *)': '#f87171' },
  },
  dangerTitle: {
    color: { default: '#7f1d1d', ':is([data-theme="dark"] *)': '#fee2e2' },
  },
  exampleContainer: {
    backgroundColor: {
      default: '#faf5ff',
      ':is([data-theme="dark"] *)': 'rgb(59 7 100 / 0.3)',
    },
    borderInlineStartColor: {
      default: '#e9d5ff',
      ':is([data-theme="dark"] *)': '#6b21a8',
    },
  },
  exampleIcon: {
    color: { default: '#9333ea', ':is([data-theme="dark"] *)': '#c084fc' },
  },
  exampleTitle: {
    color: { default: '#581c87', ':is([data-theme="dark"] *)': '#f3e8ff' },
  },
  header: {
    alignItems: 'flex-start',
    display: 'flex',
  },
  icon: {
    flexShrink: 0,
    marginInlineEnd: '0.75rem',
    marginTop: '0.25rem',
  },
  iconGraphic: {
    height: '1.25rem',
    width: '1.25rem',
  },
  infoContainer: {
    backgroundColor: {
      default: '#ecfeff',
      ':is([data-theme="dark"] *)': 'rgb(8 51 68 / 0.3)',
    },
    borderInlineStartColor: {
      default: '#a5f3fc',
      ':is([data-theme="dark"] *)': '#155e75',
    },
  },
  infoIcon: {
    color: { default: '#0891b2', ':is([data-theme="dark"] *)': '#22d3ee' },
  },
  infoTitle: {
    color: { default: '#164e63', ':is([data-theme="dark"] *)': '#cffafe' },
  },
  noteContainer: {
    backgroundColor: {
      default: '#eff6ff',
      ':is([data-theme="dark"] *)': 'rgb(23 37 84 / 0.3)',
    },
    borderInlineStartColor: {
      default: '#bfdbfe',
      ':is([data-theme="dark"] *)': '#1e40af',
    },
  },
  noteIcon: {
    color: { default: '#2563eb', ':is([data-theme="dark"] *)': '#60a5fa' },
  },
  noteTitle: {
    color: { default: '#1e3a8a', ':is([data-theme="dark"] *)': '#dbeafe' },
  },
  quoteContainer: {
    backgroundColor: {
      default: '#f9fafb',
      ':is([data-theme="dark"] *)': 'rgb(3 7 18 / 0.3)',
    },
    borderInlineStartColor: {
      default: '#e5e7eb',
      ':is([data-theme="dark"] *)': '#1f2937',
    },
  },
  quoteIcon: {
    color: { default: '#4b5563', ':is([data-theme="dark"] *)': '#9ca3af' },
  },
  quoteTitle: {
    color: { default: '#111827', ':is([data-theme="dark"] *)': '#f3f4f6' },
  },
  staticTitle: {
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  successContainer: {
    backgroundColor: {
      default: '#ecfdf5',
      ':is([data-theme="dark"] *)': 'rgb(2 44 34 / 0.3)',
    },
    borderInlineStartColor: {
      default: '#a7f3d0',
      ':is([data-theme="dark"] *)': '#065f46',
    },
  },
  successIcon: {
    color: { default: '#059669', ':is([data-theme="dark"] *)': '#34d399' },
  },
  successTitle: {
    color: { default: '#064e3b', ':is([data-theme="dark"] *)': '#d1fae5' },
  },
  tipContainer: {
    backgroundColor: {
      default: '#f0fdf4',
      ':is([data-theme="dark"] *)': 'rgb(5 46 22 / 0.3)',
    },
    borderInlineStartColor: {
      default: '#bbf7d0',
      ':is([data-theme="dark"] *)': '#166534',
    },
  },
  tipIcon: {
    color: { default: '#16a34a', ':is([data-theme="dark"] *)': '#4ade80' },
  },
  tipTitle: {
    color: { default: '#14532d', ':is([data-theme="dark"] *)': '#dcfce7' },
  },
  toggle: {
    borderRadius: '0.125rem',
    outline: 'none',
    alignItems: 'center',
    boxShadow: {
      default: 'none',
      ':focus-visible': '0 0 0 2px hsl(var(--theme-bg)), 0 0 0 4px #3b82f6',
    },
    display: 'flex',
    fontWeight: 600,
    justifyContent: 'space-between',
    textAlign: 'start',
    width: '100%',
  },
  warningContainer: {
    backgroundColor: {
      default: '#fefce8',
      ':is([data-theme="dark"] *)': 'rgb(66 32 6 / 0.3)',
    },
    borderInlineStartColor: {
      default: '#fef08a',
      ':is([data-theme="dark"] *)': '#854d0e',
    },
  },
  warningIcon: {
    color: { default: '#ca8a04', ':is([data-theme="dark"] *)': '#facc15' },
  },
  warningTitle: {
    color: { default: '#713f12', ':is([data-theme="dark"] *)': '#fef9c3' },
  },
});
