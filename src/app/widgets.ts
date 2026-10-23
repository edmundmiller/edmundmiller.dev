import * as stylex from '@stylexjs/stylex';
import { Effect, Schema } from 'effect';
import { Mount } from 'foldkit';
import type { Html, HtmlBuilder } from 'foldkit/html';
import { scaleLinear } from 'd3-scale';
import { backingSize, paintColumn, resample } from '../components/dither-kit/dither-paint';
import { PALETTE } from '../components/dither-kit/palette';
import { Message } from './model';
import { styles } from './widgets.stylex';
import { LogoRenderer } from './widgets/logo';

export const MountLogo = Mount.define('MountLogo', {
  messages: [Message.CompletedMountLogo],
  execute: ({ element }) =>
    Effect.acquireRelease(
      Effect.sync(() => {
        const renderer = new LogoRenderer(element as HTMLElement);
        renderer.connectedCallback();
        return renderer;
      }),
      (renderer) => Effect.sync(() => renderer.disconnectedCallback()),
    ).pipe(Effect.as(Message.CompletedMountLogo())),
});

type Datum = { year: string; posts: number };
const maxPosts = (data: readonly Datum[]) =>
  Math.max(1, ...data.map(({ posts }) => (Number.isFinite(posts) ? posts : 0)));

// The canvas owns only pixels, not application state or DOM children. Foldkit
// owns its lifetime; all selection is derived from the parent's selectedYear.
const MountCadence = Mount.define('MountCadence', {
  args: { data: Schema.Array(Schema.Struct({ year: Schema.String, posts: Schema.Number })) },
  messages: [Message.CompletedMountLogo],
  execute: ({ element, data }) =>
    Effect.acquireRelease(
      Effect.sync(() => {
        const canvas = element as HTMLCanvasElement;
        const draw = () => {
          const bounds = canvas.getBoundingClientRect();
          const width = bounds.width;
          const height = bounds.height;
          const ratio = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = Math.max(1, Math.round(width * ratio));
          canvas.height = Math.max(1, Math.round(height * ratio));
          const context = canvas.getContext('2d');
          if (!context || data.length === 0) return;
          context.setTransform(ratio, 0, 0, ratio, 0, 0);
          // Match the SVG viewBox margins while keeping dither cells at 2 CSS px.
          const left = (width * 36) / 640;
          const plotWidth = (width * 592) / 640;
          const { cols, rows } = backingSize(plotWidth, height - 32);
          const off = document.createElement('canvas');
          off.width = cols;
          off.height = rows;
          const ink = off.getContext('2d');
          if (!ink) return;
          const y = scaleLinear()
            .domain([0, maxPosts(data)])
            .nice()
            .range([rows - 1, 0]);
          const top = resample(
            data.map(({ posts }) => y(Math.max(0, Number.isFinite(posts) ? posts : 0))),
            cols,
          );
          for (let x = 0; x < cols; x++)
            paintColumn(ink, x, top[x]!, rows - 1, PALETTE.green, {
              variant: 'gradient',
              intensity: 0,
              dim: 1,
              stacked: false,
            });
          context.imageSmoothingEnabled = false;
          context.drawImage(off, left, 10, plotWidth, height - 32);
          context.save();
          context.filter = 'blur(3px) brightness(1.35) saturate(1.4)';
          context.globalCompositeOperation = 'lighter';
          context.globalAlpha = 0.7;
          context.drawImage(off, left, 10, plotWidth, height - 32);
          context.restore();
        };
        const observer = new ResizeObserver(draw);
        observer.observe(canvas);
        draw();
        return observer;
      }),
      (observer) => Effect.sync(() => observer.disconnect()),
    ).pipe(Effect.as(Message.CompletedMountLogo())),
});

export const logoView = (h: HtmlBuilder<Message>): Html =>
  h.span(
    [h.Class('site-dna-logo'), h.Attribute('aria-hidden', 'true'), h.OnMount(MountLogo())],
    [h.canvas([h.Attribute('aria-hidden', 'true')])],
  );

export const cadenceView = (
  data: readonly Datum[],
  selectedYear: string | null,
  h: HtmlBuilder<Message>,
): Html => {
  const cls = (style: stylex.StyleXStyles) => h.Class(stylex.props(style).className ?? '');
  const attr = h.Attribute;
  const x = (index: number) =>
    data.length === 1 ? 332 : 36 + (index / Math.max(1, data.length - 1)) * 592;
  const y = scaleLinear()
    .domain([0, maxPosts(data)])
    .nice()
    .range([186, 10]);
  const selected = data.findIndex(({ year }) => year === selectedYear);
  const clear = Message.HoveredChartYear({ year: null });
  const step = Math.max(1, Math.ceil(data.length / 6));
  return h.div(
    [
      cls(styles.chart),
      h.AriaLabel('Posts published by year'),
      attr('role', 'group'),
      h.OnMouseLeave(clear),
    ],
    [
      h.canvas([
        cls(styles.surface),
        attr('aria-hidden', 'true'),
        h.OnMount(MountCadence({ data: [...data] })),
      ]),
      h.svg(
        [
          attr('viewBox', '0 0 640 208'),
          attr('preserveAspectRatio', 'none'),
          attr('width', '100%'),
          attr('height', '100%'),
        ],
        [
          ...(selected < 0
            ? []
            : [
                h.line([
                  attr('x1', String(x(selected))),
                  attr('x2', String(x(selected))),
                  attr('y1', '10'),
                  attr('y2', '186'),
                  attr('stroke', 'currentColor'),
                  attr('stroke-opacity', '0.35'),
                  attr('stroke-dasharray', '3 3'),
                ]),
                h.circle([
                  attr('cx', String(x(selected))),
                  attr('cy', String(y(data[selected]!.posts))),
                  attr('r', '3'),
                  attr('fill', 'rgb(40,210,110)'),
                ]),
              ]),
          ...data.map((datum, i) => {
            const left = i === 0 ? 36 : (x(i - 1) + x(i)) / 2;
            const right = i === data.length - 1 ? 628 : (x(i) + x(i + 1)) / 2;
            const select = Message.HoveredChartYear({ year: datum.year });
            return h.keyed('rect')(
              datum.year,
              [
                attr('x', String(left)),
                attr('y', '10'),
                attr('width', String(right - left)),
                attr('height', '176'),
                attr('fill', 'transparent'),
                attr('tabindex', '0'),
                attr('role', 'img'),
                h.AriaLabel(`${datum.year}: ${datum.posts} posts`),
                h.OnMouseEnter(select),
                h.OnFocus(select),
                h.OnBlur(clear),
              ],
              [],
            );
          }),
        ],
      ),
      // Keep label glyphs in CSS pixels when the SVG plot narrows.
      ...y
        .ticks(4)
        .map((tick) =>
          h.span(
            [
              cls(styles.label),
              h.Style({ left: '4.375%', top: `${y(tick)}px`, transform: 'translate(-100%, -50%)' }),
            ],
            [String(tick)],
          ),
        ),
      ...data
        .filter((_, i) => i % step === 0)
        .map((datum) =>
          h.span(
            [
              cls(styles.label),
              h.Style({
                left: `${(x(data.indexOf(datum)) / 640) * 100}%`,
                top: '194px',
                transform: 'translateX(-50%)',
              }),
            ],
            [datum.year],
          ),
        ),
      ...(selected < 0
        ? []
        : [
            h.div(
              [
                cls(styles.tooltip),
                attr('role', 'status'),
                h.Style({ left: `${Math.max(12, Math.min(88, (x(selected) / 640) * 100))}%` }),
              ],
              [
                h.div([cls(styles.heading)], [data[selected]!.year]),
                h.div(
                  [cls(styles.value)],
                  [h.span([cls(styles.swatch)]), `Posts ${data[selected]!.posts}`],
                ),
              ],
            ),
          ]),
    ],
  );
};
