import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../../styles/tokens.stylex';
import { useCommonChart } from './common-context';
import { rgb } from './palette';

const styles = stylex.create({
  legend: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    insetInline: 0,
    paddingInline: '0.25rem',
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
  },
  alignLeft: { justifyContent: 'flex-start' },
  alignCenter: { justifyContent: 'center' },
  alignRight: { justifyContent: 'flex-end' },
  entry: {
    alignItems: 'center',
    color: colors.text,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '11px',
    gap: '0.375rem',
    transitionDuration: '150ms',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  clickable: {
    cursor: 'pointer',
    pointerEvents: 'auto',
    color: {
      default: colors.text,
      ':hover': colors.text,
    },
  },
  dimmed: { opacity: 0.4 },
  swatch: {
    borderRadius: '1px',
    height: '0.5rem',
    width: '0.5rem',
  },
});

/** Series/slice legend. With `isClickable`, each entry toggles its selection.
 * Works in every chart family via the shared common context. */
export function Legend({
  isClickable = false,
  align = 'right',
}: {
  isClickable?: boolean;
  align?: 'left' | 'center' | 'right';
}) {
  const chart = useCommonChart();

  return (
    <div
      {...stylex.props(
        styles.legend,
        align === 'right' && styles.alignRight,
        align === 'center' && styles.alignCenter,
        align === 'left' && styles.alignLeft,
      )}
    >
      {chart.names.map((name) => {
        const seed = chart.seedOf(name);
        const emphasis = chart.selectedDataKey ?? chart.focusDataKey;
        const dimmed = emphasis !== null && emphasis !== name;
        return (
          <button
            key={name}
            type="button"
            disabled={!isClickable}
            onClick={() => chart.selectDataKey(chart.selectedDataKey === name ? null : name)}
            // Hovering an entry spotlights its series so overlapping layers
            // (e.g. two meshed radar polygons) can be told apart at a glance.
            onPointerEnter={() => chart.setFocusDataKey(name)}
            onPointerLeave={() => chart.setFocusDataKey(null)}
            onFocus={() => chart.setFocusDataKey(name)}
            onBlur={() => chart.setFocusDataKey(null)}
            {...stylex.props(
              styles.entry,
              isClickable && styles.clickable,
              dimmed && styles.dimmed,
            )}
          >
            <span {...stylex.props(styles.swatch)} style={{ backgroundColor: rgb(seed.fill) }} />
            {chart.labelOf(name)}
          </button>
        );
      })}
    </div>
  );
}

Legend.chartLayer = 'dom' as const;
