// theme.config.js
const { ThemeBuilder, Theme } = require('tailwindcss-theming');

const mainTheme = new Theme()
  .name('light')
  .default()
  .colors({
    brand: '#F3F7F9',
    'brand-color': '#fff',
    'brand-code': '#fffbf3',
    'body-color': '#444',
    'title-color': '#111',
    'link-color': '#6b17e6',
    'border-color': '#e5e5e5'
  });

const darkTheme = new Theme().name('dark').colors({
  brand: '#0D2538',
  'brand-color': '#0f2d44',
  'brand-code': '#b2b2b2',
  'body-color': '#ffffff',
  'title-color': '#ced8de',
  'link-color': '#fff',
  'border-color': '#af9cef'
});

module.exports = new ThemeBuilder()
  .asDataThemeAttribute()
  .default(mainTheme)
  .dark(darkTheme);
