import * as stylex from '@stylexjs/stylex';
import { admonitionColors as colors, effects, motion } from '../styles/tokens.stylex';

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
      ':hover': effects.admonitionShadow,
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
      default: colors.dangerBackground,
      ':is([data-theme="dark"] *)': colors.dangerBackgroundDark,
    },
    borderInlineStartColor: {
      default: colors.dangerBorder,
      ':is([data-theme="dark"] *)': colors.dangerBorderDark,
    },
  },
  dangerIcon: {
    color: { default: colors.dangerIcon, ':is([data-theme="dark"] *)': colors.dangerIconDark },
  },
  dangerTitle: {
    color: { default: colors.dangerTitle, ':is([data-theme="dark"] *)': colors.dangerTitleDark },
  },
  exampleContainer: {
    backgroundColor: {
      default: colors.exampleBackground,
      ':is([data-theme="dark"] *)': colors.exampleBackgroundDark,
    },
    borderInlineStartColor: {
      default: colors.exampleBorder,
      ':is([data-theme="dark"] *)': colors.exampleBorderDark,
    },
  },
  exampleIcon: {
    color: { default: colors.exampleIcon, ':is([data-theme="dark"] *)': colors.exampleIconDark },
  },
  exampleTitle: {
    color: { default: colors.exampleTitle, ':is([data-theme="dark"] *)': colors.exampleTitleDark },
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
      default: colors.infoBackground,
      ':is([data-theme="dark"] *)': colors.infoBackgroundDark,
    },
    borderInlineStartColor: {
      default: colors.infoBorder,
      ':is([data-theme="dark"] *)': colors.infoBorderDark,
    },
  },
  infoIcon: {
    color: { default: colors.infoIcon, ':is([data-theme="dark"] *)': colors.infoIconDark },
  },
  infoTitle: {
    color: { default: colors.infoTitle, ':is([data-theme="dark"] *)': colors.infoTitleDark },
  },
  noteContainer: {
    backgroundColor: {
      default: colors.noteBackground,
      ':is([data-theme="dark"] *)': colors.noteBackgroundDark,
    },
    borderInlineStartColor: {
      default: colors.noteBorder,
      ':is([data-theme="dark"] *)': colors.noteBorderDark,
    },
  },
  noteIcon: {
    color: { default: colors.noteIcon, ':is([data-theme="dark"] *)': colors.noteIconDark },
  },
  noteTitle: {
    color: { default: colors.noteTitle, ':is([data-theme="dark"] *)': colors.noteTitleDark },
  },
  quoteContainer: {
    backgroundColor: {
      default: colors.quoteBackground,
      ':is([data-theme="dark"] *)': colors.quoteBackgroundDark,
    },
    borderInlineStartColor: {
      default: colors.quoteBorder,
      ':is([data-theme="dark"] *)': colors.quoteBorderDark,
    },
  },
  quoteIcon: {
    color: { default: colors.quoteIcon, ':is([data-theme="dark"] *)': colors.quoteIconDark },
  },
  quoteTitle: {
    color: { default: colors.quoteTitle, ':is([data-theme="dark"] *)': colors.quoteTitleDark },
  },
  staticTitle: {
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  successContainer: {
    backgroundColor: {
      default: colors.successBackground,
      ':is([data-theme="dark"] *)': colors.successBackgroundDark,
    },
    borderInlineStartColor: {
      default: colors.successBorder,
      ':is([data-theme="dark"] *)': colors.successBorderDark,
    },
  },
  successIcon: {
    color: { default: colors.successIcon, ':is([data-theme="dark"] *)': colors.successIconDark },
  },
  successTitle: {
    color: { default: colors.successTitle, ':is([data-theme="dark"] *)': colors.successTitleDark },
  },
  tipContainer: {
    backgroundColor: {
      default: colors.tipBackground,
      ':is([data-theme="dark"] *)': colors.tipBackgroundDark,
    },
    borderInlineStartColor: {
      default: colors.tipBorder,
      ':is([data-theme="dark"] *)': colors.tipBorderDark,
    },
  },
  tipIcon: {
    color: { default: colors.tipIcon, ':is([data-theme="dark"] *)': colors.tipIconDark },
  },
  tipTitle: {
    color: { default: colors.tipTitle, ':is([data-theme="dark"] *)': colors.tipTitleDark },
  },
  toggle: {
    borderRadius: '0.125rem',
    outline: 'none',
    alignItems: 'center',
    boxShadow: {
      default: 'none',
      ':focus-visible': effects.admonitionFocus,
    },
    display: 'flex',
    fontWeight: 600,
    justifyContent: 'space-between',
    textAlign: 'start',
    width: '100%',
  },
  warningContainer: {
    backgroundColor: {
      default: colors.warningBackground,
      ':is([data-theme="dark"] *)': colors.warningBackgroundDark,
    },
    borderInlineStartColor: {
      default: colors.warningBorder,
      ':is([data-theme="dark"] *)': colors.warningBorderDark,
    },
  },
  warningIcon: {
    color: { default: colors.warningIcon, ':is([data-theme="dark"] *)': colors.warningIconDark },
  },
  warningTitle: {
    color: { default: colors.warningTitle, ':is([data-theme="dark"] *)': colors.warningTitleDark },
  },
});
