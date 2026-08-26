import * as stylex from '@stylexjs/stylex';

export const colors = stylex.defineVars({
  accent: 'hsl(var(--theme-accent))',
  accent2: 'hsl(var(--theme-accent-2))',
  background: 'hsl(var(--theme-bg))',
  link: 'hsl(var(--theme-link))',
  quote: 'hsl(var(--theme-quote))',
  text: 'hsl(var(--theme-text))',
});

export const fonts = stylex.defineVars({
  body: 'Geist Pixel Square, ui-monospace, SFMono-Regular, Roboto Mono, Menlo, Monaco, Liberation Mono, DejaVu Sans Mono, Courier New, monospace',
  heading: 'Geist Pixel Grid, Geist Pixel Square, ui-monospace, monospace',
});

export const spacing = stylex.defineVars({
  page: '2rem',
  section: '4rem',
});

export const motion = stylex.defineVars({
  fast: '150ms',
  normal: '200ms',
});

export const breakpoints = stylex.defineConsts({
  small: '640px',
});
