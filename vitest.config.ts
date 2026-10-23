import stylex from '@stylexjs/unplugin';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [stylex.vite({ devMode: 'full', useCSSLayers: false })],
  test: { include: ['src/app/**/*.story.test.ts', 'src/app/**/*.scene.test.ts'] },
});
