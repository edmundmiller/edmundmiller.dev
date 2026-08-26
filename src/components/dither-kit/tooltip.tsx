'use client';

import * as stylex from '@stylexjs/stylex';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { colors, fonts } from '../../styles/tokens.stylex';
import { useCommonChart } from './common-context';
import { rgb } from './palette';

export type TooltipVariant = 'default' | 'frosted-glass';

const styles = stylex.create({
  tooltip: {
    backgroundColor: colors.background,
    borderColor: '#e5e7eb',
    borderRadius: '0.375rem',
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: '0 1px 2px 0 #0000000d',
    paddingBlock: '0.25rem',
    paddingInline: '0.5rem',
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 10,
  },
  frostedGlass: {
    backdropFilter: 'blur(4px)',
    backgroundColor: 'hsl(var(--theme-bg) / 0.7)',
  },
  heading: {
    color: colors.text,
    fontFamily: fonts.body,
    fontSize: '10px',
    marginBottom: '0.125rem',
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.125rem',
  },
  item: {
    alignItems: 'center',
    color: colors.text,
    display: 'flex',
    fontFamily: fonts.body,
    fontSize: '11px',
    fontVariantNumeric: 'tabular-nums',
    gap: '0.375rem',
  },
  itemDimmed: { opacity: 0.4 },
  swatch: {
    borderRadius: '1px',
    height: '0.5rem',
    width: '0.5rem',
  },
  label: { color: colors.text },
  value: {
    color: colors.text,
    marginInlineStart: 'auto',
    paddingInlineStart: '0.5rem',
  },
});

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
          <div {...stylex.props(styles.items)}>
            {items.map((item) => (
              <div key={item.name} {...stylex.props(styles.item, item.dimmed && styles.itemDimmed)}>
                <span
                  {...stylex.props(styles.swatch)}
                  style={{ backgroundColor: rgb(item.seed.fill) }}
                />
                <span {...stylex.props(styles.label)}>{item.label}</span>
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

Tooltip.chartLayer = 'dom' as const;
