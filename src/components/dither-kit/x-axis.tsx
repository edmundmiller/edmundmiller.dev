'use client';

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

export function XAxis({
  dataKey,
  tickFormatter,
  tickMargin = 8,
  maxTicks = 8,
}: {
  dataKey?: string;
  tickFormatter?: (value: unknown, index: number) => string;
  tickMargin?: number;
  maxTicks?: number;
}) {
  const ctx = useChartPart('XAxis');
  if (!ctx.ready) return null;

  const step = Math.max(1, Math.ceil(ctx.dataLength / maxTicks));
  const y = ctx.plot.height + tickMargin;

  return (
    <g {...stylex.props(styles.ticks)}>
      {ctx.data.map((row, i) => {
        if (i % step !== 0) return null;
        const raw = dataKey ? row[dataKey] : i;
        const label = tickFormatter ? tickFormatter(raw, i) : String(raw ?? '');
        return (
          <text
            // biome-ignore lint/suspicious/noArrayIndexKey: index is the stable x position
            key={i}
            x={ctx.xCenter(i) ?? 0}
            y={y}
            textAnchor="middle"
            dominantBaseline="hanging"
            fill="currentColor"
          >
            {label}
          </text>
        );
      })}
    </g>
  );
}
