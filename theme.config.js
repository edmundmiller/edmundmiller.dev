// theme.config.js
const { ThemeBuilder, Theme } = require('tailwindcss-theming');

const mainTheme = new Theme()
  .name('light')
  .default()
  .colors({
    brand: '#2196f3',
    'on-brand': '#ffffff',
    'navigation-primary': '#3c4253',
    'navigation-secondary': '#303030',
    'on-navigation': '#9aa2b6',
    background: '#f4f4f4',
    surface: '#ffffff',
    'on-background': '#585851',
    'on-surface': '#3c3c3c'
  });

const darkTheme = new Theme().name('dark').colors({
  brand: '#1565c0',
  'on-brand': '#ffffff'
});

module.exports = new ThemeBuilder()
  .asDataThemeAttribute()
  .default(mainTheme)
  .dark(darkTheme);
