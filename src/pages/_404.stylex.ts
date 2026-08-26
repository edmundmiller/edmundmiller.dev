import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../styles/tokens.stylex';

export const styles = stylex.create({
  pageTitle: {
    color: colors.accent2,
    fontFamily: fonts.heading,
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: '2rem',
    marginBottom: '1.5rem',
  },
  guidance: {
    marginBottom: '2rem',
  },
  imageContainer: {
    marginBlock: '1rem',
    display: 'grid',
    justifyContent: 'center',
  },
});
