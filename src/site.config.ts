import type { RehypeExpressiveCodeOptions } from 'rehype-expressive-code';
import type { SiteConfig } from './types.ts';

export const siteConfig: SiteConfig = {
  author: 'Edmund Miller',
  title: 'Edmund Miller',
  // Meta property used as the default description meta property
  description:
    'Bioinformatics engineer at Seqera (nf-core core team). Writing about Nextflow, nf-core, functional genomics, reproducible workflows, and software for data-intensive science.',
  lang: 'en-US',
  ogLocale: 'en_US',
  // Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
  date: {
    locale: 'en-US',
    options: {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  },
  webmentions: {
    link: 'https://webmention.io/edmundmiller.dev/webmention',
  },
};

// Used to generate links in both the Header & Footer.
export const menuLinks: Array<{ title: string; path: string }> = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'About',
    path: '/about/',
  },
  {
    title: 'Blog',
    path: '/posts/',
  },
  {
    title: 'Speaking',
    path: '/speaking/',
  },
];

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: RehypeExpressiveCodeOptions = {
  // One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
  themes: ['everforest-dark', 'everforest-light'],
  themeCssSelector(theme, { styleVariants }) {
    // If one dark and one light theme are available
    // generate theme CSS selectors compatible with cactus-theme dark mode switch
    if (styleVariants.length >= 2) {
      const baseTheme = styleVariants[0]?.theme;
      const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
      if (theme === baseTheme || theme === altTheme) {
        return `[data-theme='${theme.type}']`;
      }
    }
    // return default selector
    return `[data-theme="${theme.name}"]`;
  },
  useThemedScrollbars: false,
  styleOverrides: {
    codeBackground: 'hsl(var(--theme-bg))',
    codeForeground: 'hsl(var(--theme-text))',
    borderColor: 'hsl(var(--theme-text) / 0.25)',
    borderWidth: '1px',
    focusBorder: 'hsl(var(--theme-accent))',
    uiFontFamily: 'inherit',
    frames: {
      frameBoxShadowCssValue: 'none',
      editorTabBarBackground: 'hsl(var(--theme-text) / 0.04)',
      editorTabBarBorderColor: 'hsl(var(--theme-text) / 0.25)',
      editorTabBarBorderBottomColor: 'hsl(var(--theme-text) / 0.25)',
      editorActiveTabBackground: 'hsl(var(--theme-bg))',
      editorActiveTabForeground: 'hsl(var(--theme-text))',
      editorActiveTabIndicatorTopColor: 'hsl(var(--theme-accent))',
      editorActiveTabIndicatorBottomColor: 'transparent',
      terminalBackground: 'hsl(var(--theme-bg))',
      terminalTitlebarBackground: 'hsl(var(--theme-text) / 0.04)',
      terminalTitlebarForeground: 'hsl(var(--theme-text))',
      terminalTitlebarBorderBottomColor: 'hsl(var(--theme-text) / 0.25)',
    },
    textMarkers: {
      markBackground: 'hsl(var(--theme-accent) / 0.1)',
      markBorderColor: 'hsl(var(--theme-accent) / 0.6)',
    },
    uiLineHeight: 'inherit',
    codeFontSize: '0.875rem',
    codeLineHeight: '1.7142857rem',
    borderRadius: '2px',
    codePaddingInline: '1rem',
    codeFontFamily:
      '"Geist Pixel Square", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
};
