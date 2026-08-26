import * as stylex from '@stylexjs/stylex';
import { colors, fonts } from '../../styles/tokens.stylex';
import { useChartPart } from './chart-context';

const styles = stylex.create({
  ticks: {
    color: colors.text,
    fill: 'currentColor',
    fontFamily: fonts.body,
    fontSize: '10px',
  },
});

export function YAxis({
  tickFormatter,
  tickCount = 4,
  tickMargin = 8,
}: {
  tickFormatter?: (value: number) => string;
  tickCount?: number;
  tickMargin?: number;
}) {
  const ctx = useChartPart('YAxis');
  if (!ctx.ready) return null;

  return (
    <g {...stylex.props(styles.ticks)}>
      {ctx.y.ticks(tickCount).map((t) => (
        <text
          key={t}
          x={-tickMargin}
          y={ctx.y(t)}
          textAnchor="end"
          dominantBaseline="central"
          fill="currentColor"
        >
          {tickFormatter ? tickFormatter(t) : t}
        </text>
      ))}
    </g>
  );
}
