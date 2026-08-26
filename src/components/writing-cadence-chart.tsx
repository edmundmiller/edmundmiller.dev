import * as stylex from '@stylexjs/stylex';
import { Area, AreaChart, Tooltip, XAxis, YAxis } from '@/components/dither-kit/area-chart';

const styles = stylex.create({
  chart: {
    height: '13rem',
    width: '100%',
  },
});

type WritingCadenceDatum = {
  year: string;
  posts: number;
};

const config = {
  posts: { label: 'Posts', color: 'green' },
} as const;

export default function WritingCadenceChart({ data }: { data: WritingCadenceDatum[] }) {
  return (
    <div {...stylex.props(styles.chart)} aria-label="Posts published by year" role="group">
      <AreaChart data={data} config={config} bloom="low">
        <XAxis dataKey="year" maxTicks={6} />
        <YAxis tickCount={4} />
        <Tooltip labelKey="year" />
        <Area dataKey="posts" variant="gradient" />
      </AreaChart>
    </div>
  );
}
