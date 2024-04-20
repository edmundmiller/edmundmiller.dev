import type { SiteConfig } from "@/types";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
import fs from "node:fs";

export const siteConfig: SiteConfig = {
  // Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
  author: "Edmund Miller",
  // Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
  title: "Edmund Miller",
  // Meta property used as the default description meta property
  // TODO Come up with a better description
  description: "Bioinformatics, Biology, Genomics I don't know, I write code.",
  // HTML lang property, found in src/layouts/Base.astro L:18
  lang: "en-US",
  // Meta property, found in src/components/BaseHead.astro L:42
  ogLocale: "en_US",
  // Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
  date: {
    locale: "en-US",
    options: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  },
  webmentions: {
    link: "https://webmention.io/edmundmiller.dev/webmention",
  },
};

// Used to generate links in both the Header & Footer.
export const menuLinks: Array<{ title: string; path: string }> = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about/",
  },
  {
    title: "Blog",
    path: "/posts/",
  },
];

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
  // One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
  themes: ["dracula", "github-light"],
  themeCssSelector(theme, { styleVariants }) {
    // If one dark and one light theme are available
    // generate theme CSS selectors compatible with cactus-theme dark mode switch
    if (styleVariants.length >= 2) {
      const baseTheme = styleVariants[0]?.theme;
      const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
      if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
    }
    // return default selector
    return `[data-theme="${theme.name}"]`;
  },
  useThemedScrollbars: false,
  shiki: {
    // You can pass additional plugin options here,
    // e.g. to load custom language grammars:
    langs: [
      // import('./some-exported-grammar.mjs'),
      JSON.parse(fs.readFileSync("./src/misc/elisp-grammar.json", "utf-8")),
    ],
  },
  styleOverrides: {
    frames: {
      frameBoxShadowCssValue: "none",
    },
    uiLineHeight: "inherit",
    codeFontSize: "0.875rem",
    codeLineHeight: "1.7142857rem",
    borderRadius: "4px",
    codePaddingInline: "1rem",
    codeFontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
  },
};
