import * as stylex from '@stylexjs/stylex';
import { colors, effects, fonts } from '../styles/tokens.stylex';

export const styles = stylex.create({
  chart: { color: colors.text, position: 'relative', height: '13rem', width: '100%' },
  surface: { inset: 0, pointerEvents: 'none', position: 'absolute', height: '100%', width: '100%' },
  label: {
    fontFamily: fonts.body,
    fontSize: '10px',
    lineHeight: 1,
    pointerEvents: 'none',
    position: 'absolute',
    whiteSpace: 'nowrap',
  },
  tooltip: {
    borderColor: colors.border,
    borderRadius: '0.375rem',
    borderStyle: 'solid',
    borderWidth: '1px',
    paddingBlock: '0.25rem',
    paddingInline: '0.5rem',
    backgroundColor: colors.background,
    boxShadow: effects.tooltipShadow,
    color: colors.text,
    fontFamily: fonts.body,
    fontSize: '11px',
    pointerEvents: 'none',
    position: 'absolute',
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
    zIndex: 10,
    top: '12px',
  },
  heading: { fontSize: '10px', marginBottom: '0.125rem' },
  value: { gap: '0.375rem', alignItems: 'center', display: 'flex' },
  swatch: {
    borderRadius: '1px',
    backgroundColor: colors.chart,
    height: '0.5rem',
    width: '0.5rem',
  },
});
