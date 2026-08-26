import * as stylex from '@stylexjs/stylex';

const large = '@media (min-width: 1024px)';

export const styles = stylex.create({
  heading: {
    fontWeight: 600,
  },
  navigation: {
    display: {
      default: 'none',
      [large]: 'block',
    },
    flexBasis: '16rem',
    marginInlineEnd: '-8rem',
    order: 2,
    position: 'sticky',
    top: '5rem',
  },
  sectionList: {
    fontSize: '0.75rem',
    lineHeight: '1rem',
    marginTop: '1rem',
  },
});
