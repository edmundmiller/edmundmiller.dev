import { Area, AreaChart, Tooltip, XAxis, YAxis } from '@/components/dither-kit/area-chart';

type WritingCadenceDatum = {
  year: string;
  posts: number;
};

const config = {
  posts: { label: 'Posts', color: 'green' },
} as const;

export default function WritingCadenceChart({ data }: { data: WritingCadenceDatum[] }) {
  return (
    <div className="h-52 w-full" aria-label="Posts published by year">
      <AreaChart data={data} config={config} bloom="low">
        <XAxis dataKey="year" maxTicks={6} />
        <YAxis tickCount={4} />
        <Tooltip labelKey="year" />
        <Area dataKey="posts" variant="gradient" />
      </AreaChart>
    </div>
  );
}
