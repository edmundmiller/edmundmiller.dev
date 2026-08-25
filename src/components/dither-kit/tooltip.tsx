'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useCommonChart } from './common-context';
import { rgb } from './palette';

export type TooltipVariant = 'default' | 'frosted-glass';

/**
 * Floating hover tooltip. Reads the shared common context so it works in every
 * chart family. It glides between points and fades in/out (instead of snapping),
 * and dims unselected series/slices.
 */
export function Tooltip({
  labelKey,
  valueFormatter,
  variant = 'default',
}: {
  labelKey?: string;
  valueFormatter?: (value: number, name: string) => string;
  variant?: TooltipVariant;
}) {
  const chart = useCommonChart();
  const show = chart.ready && chart.hoverIndex != null;

  // Retain the last hovered index so the card keeps its content while fading
  // out — adjust-state-during-render (no refs in render).
  const [lastIndex, setLastIndex] = useState(0);
  if (chart.hoverIndex != null && chart.hoverIndex !== lastIndex) {
    setLastIndex(chart.hoverIndex);
  }
  const index = chart.hoverIndex ?? lastIndex;

  const heading = chart.heading(index, labelKey);
  const items = chart.itemsAt(index);

  return (
    <AnimatePresence>
      {show && items.length > 0 && (
        <motion.div
          key="dither-tooltip"
          initial={{
            opacity: 0,
            x: '-50%',
            y: '-115%',
            top: chart.tooltipTop,
            left: chart.tooltipLeft,
          }}
          animate={{
            opacity: 1,
            x: '-50%',
            y: '-115%',
            top: chart.tooltipTop,
            left: chart.tooltipLeft,
          }}
          exit={{ opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 520,
            damping: 38,
            mass: 0.6,
          }}
          {...stylex.props(styles.tooltip, variant === 'frosted-glass' && styles.frostedGlass)}
        >
          {heading && <div {...stylex.props(styles.heading)}>{heading}</div>}
          <div {...stylex.props(styles.itemList)}>
            {items.map((item) => (
              <div
                key={item.name}
                {...stylex.props(styles.item)}
                style={{ opacity: item.dimmed ? 0.4 : 1 }}
              >
                <span
                  {...stylex.props(styles.swatch)}
                  style={{ backgroundColor: rgb(item.seed.fill) }}
                />
                <span {...stylex.props(styles.mutedText)}>{item.label}</span>
                <span {...stylex.props(styles.value)}>
                  {valueFormatter
                    ? valueFormatter(item.value, item.name)
                    : item.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const fontFamily =
  'Geist Pixel Square, ui-monospace, SFMono-Regular, Roboto Mono, Menlo, Monaco, Liberation Mono, DejaVu Sans Mono, Courier New, monospace';

const styles = stylex.create({
  tooltip: {
    backgroundColor: 'hsl(var(--theme-bg))',
    borderColor: 'currentColor',
    borderRadius: 6,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    paddingBlock: 4,
    paddingInline: 8,
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 10,
  },
  frostedGlass: {
    backdropFilter: 'blur(4px)',
    backgroundColor: 'hsl(var(--theme-bg) / 0.7)',
  },
  heading: {
    color: 'hsl(var(--theme-text))',
    fontFamily,
    fontSize: 10,
    marginBottom: 2,
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  item: {
    alignItems: 'center',
    color: 'hsl(var(--theme-text))',
    display: 'flex',
    fontFamily,
    fontSize: 11,
    gap: 6,
  },
  swatch: {
    blockSize: 8,
    borderRadius: 1,
    inlineSize: 8,
  },
  mutedText: {
    color: 'hsl(var(--theme-text))',
  },
  value: {
    color: 'hsl(var(--theme-text))',
    marginInlineStart: 'auto',
    paddingInlineStart: 8,
  },
});

Tooltip.chartLayer = 'dom' as const;
