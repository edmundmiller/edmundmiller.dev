import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../styles/tokens.stylex';

export const styles = stylex.create({
  heading: {
    color: colors.accent2,
    fontFamily: fonts.heading,
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: '1.75rem',
    marginBottom: '1rem',
  },
  entries: {
    margin: '-0.5rem',
    display: 'flex',
    flexWrap: 'wrap',
  },
  entry: {
    margin: '0.5rem',
    padding: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    minWidth: '10rem',
  },
  entryTitle: {
    margin: 0,
    color: colors.accent2,
    fontFamily: fonts.heading,
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: '1.75rem',
    marginBottom: '1rem',
  },
  summary: {
    display: 'flex',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
  source: {
    display: 'block',
  },
  attribution: {
    color: '#555555',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    textAlign: 'end',
  },
});
