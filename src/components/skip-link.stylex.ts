import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  link: {
    margin: {
      default: '-1px',
      ':focus': 0,
    },
    padding: 0,
    borderWidth: 0,
    overflow: {
      default: 'hidden',
      ':focus': 'visible',
    },
    clip: {
      default: 'rect(0, 0, 0, 0)',
      ':focus': 'auto',
    },
    insetInlineStart: {
      default: 'auto',
      ':focus': '0.25rem',
    },
    position: {
      default: 'absolute',
      ':focus': 'fixed',
    },
    whiteSpace: {
      default: 'nowrap',
      ':focus': 'normal',
    },
    height: {
      default: '1px',
      ':focus': 'auto',
    },
    top: {
      default: 'auto',
      ':focus': '0.375rem',
    },
    width: {
      default: '1px',
      ':focus': 'auto',
    },
  },
});
