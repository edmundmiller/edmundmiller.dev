import * as stylex from '@stylexjs/stylex';

export const styles = stylex.create({
  divider: {
    borderStyle: 'solid',
  },
  heading: {
    display: {
      default: 'block',
      '::before': 'none',
    },
    marginBottom: '2rem',
  },
  responses: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '2.5rem',
  },
  attribution: {
    marginTop: '2rem',
  },
});
