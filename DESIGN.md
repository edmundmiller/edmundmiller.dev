---
version: alpha
name: Edmund Miller
description: Compact personal site for technical writing, projects, talks, and web-native notes.
colors:
  primary: "#CB2943"
  light-bg: "#FAFAFA"
  light-text: "#22272A"
  light-link: "#56807A"
  light-accent: "#CB2943"
  light-heading: "#121212"
  light-quote: "#CB2943"
  dark-bg: "#1D1F20"
  dark-text: "#C8C9CA"
  dark-link: "#D47DA8"
  dark-accent: "#29BC82"
  dark-heading: "#EDEDED"
  dark-quote: "#D7FFB8"
  rule: "#666666"
  focus: "#A1A1AA"
  logo-brown: "#B04304"
  logo-orange: "#FF5D01"
  logo-green: "#53C68C"
typography:
  page:
    fontFamily: "Geist Pixel Square, ui-monospace, SFMono-Regular, Roboto Mono, Menlo, Monaco, Liberation Mono, DejaVu Sans Mono, Courier New, monospace"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "24px"
  title:
    fontFamily: "Geist Pixel Grid, Geist Pixel Square, ui-monospace, monospace"
    fontSize: "24px"
    fontWeight: "600"
    lineHeight: "32px"
  brand:
    fontFamily: "Geist Pixel Grid, Geist Pixel Square, ui-monospace, monospace"
    fontSize: "24px"
    fontWeight: "700"
    lineHeight: "32px"
  nav:
    fontFamily: "Geist Pixel Square, ui-monospace, monospace"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "24px"
  small:
    fontFamily: "Geist Pixel Square, ui-monospace, monospace"
    fontSize: "14px"
    fontWeight: "400"
    lineHeight: "20px"
rounded:
  code: "2px"
  control: "6px"
  dialog: "6px"
  admonition: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "64px"
components:
  page-shell:
    backgroundColor: "{colors.light-bg}"
    textColor: "{colors.light-text}"
    typography: "{typography.page}"
    padding: "64px 32px 0"
    width: "768px max"
  title:
    typography: "{typography.title}"
    textColor: "{colors.light-heading}"
  cactus-link:
    textColor: "{colors.light-text}"
    backgroundColor: "linear underline using {colors.light-text}; hover uses {colors.light-link}"
    height: "6px underline image"
  header:
    textColor: "{colors.light-heading}"
    typography: "{typography.brand}"
    padding: "0 0 112px"
    size: "logo uses {colors.logo-brown}, {colors.logo-orange}, {colors.logo-green}"
  navigation-menu:
    textColor: "{colors.light-accent}"
    backgroundColor: "transparent desktop; rgba(250, 250, 250, 0.85) mobile"
    padding: "16px"
  icon-button:
    textColor: "{colors.light-text}"
    backgroundColor: "{colors.light-bg}"
    width: "36px"
    height: "36px"
    rounded: "{rounded.control}"
  search-dialog:
    backgroundColor: "{colors.light-bg}"
    textColor: "{colors.light-text}"
    rounded: "{rounded.dialog}"
    width: "768px max"
    padding: "24px"
  post-preview:
    textColor: "{colors.light-text}"
    typography: "{typography.page}"
    width: "date column 120px"
  prose:
    textColor: "{colors.light-text}"
    typography: "{typography.page}"
    rounded: "{rounded.code}"
    size: "rules use {colors.rule}; inline code uses dotted {colors.rule}"
  admonition:
    backgroundColor: "{colors.light-bg}"
    textColor: "{colors.light-text}"
    rounded: "{rounded.admonition}"
    padding: "16px"
    size: "4px left border; 20px icon"
  dark-page-shell:
    backgroundColor: "{colors.dark-bg}"
    textColor: "{colors.dark-text}"
    typography: "{typography.page}"
    padding: "64px 32px 0"
    width: "768px max"
  dark-title:
    typography: "{typography.title}"
    textColor: "{colors.dark-heading}"
  dark-link:
    textColor: "{colors.dark-text}"
    backgroundColor: "linear underline using {colors.dark-text}; hover uses {colors.dark-link}"
    height: "6px underline image"
  dark-accent:
    textColor: "{colors.dark-accent}"
    backgroundColor: "{colors.dark-bg}"
    size: "theme-only token reference"
---

# Design Contract

Edmund Miller is a narrow, text-first personal site. It should feel like a durable notebook: compact, technical, readable, and slightly pixelated without becoming novelty UI.

## Principles

- Keep pages centered, narrow, and calm.
- Prefer one column of readable text over cards or dashboards.
- Use pixel display type for identity and headings; use the mono stack for body text.
- Links use the cactus underline treatment instead of default underlines.
- Theme color variables must work in light and dark modes.
- Controls are icon-first, 36px square, and ring on hover/focus.
- Avoid gradient backgrounds, oversized hero layouts, and decorative panels.

## Dark Mode

Dark mode swaps the same semantic tokens:

- page background: `{colors.dark-bg}`
- text: `{colors.dark-text}`
- links: `{colors.dark-link}`
- accents: `{colors.dark-accent}`
- headings: `{colors.dark-heading}`
- quotes: `{colors.dark-quote}`

## Layout

The body max width is 768px with 32px side padding and 64px top padding. Header spacing is intentionally large. Content sections use simple vertical rhythm, usually 64px between major blocks.

## Interaction

Search and theme controls stay visually quiet until hover or focus. Mobile nav appears as a blurred, translucent bg-colored panel. Dialogs use the page background, a zinc border, and no decorative chrome.
