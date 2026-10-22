import { defineConfig } from 'vite';
import { foldkit } from '@foldkit/vite-plugin';
import stylex from '@stylexjs/unplugin';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { compileContent } from './scripts/compile-content.ts';

export default defineConfig(({ command }) => ({
  appType: 'mpa',
  plugins: [
    {
      name: 'site-content',
      async buildStart() {
        await compileContent({ production: command === 'build' });
      },
      configureServer(server) {
        server.watcher.add(['src/content', 'src/pages', 'src/content.config.ts']);
        let compiling = Promise.resolve();
        server.watcher.on('all', (_event, path) => {
          if (
            !path.includes('/src/content/') &&
            !/\/src\/pages\/[^/]+\.mdx?$/.test(path) &&
            !path.endsWith('/src/content.config.ts')
          )
            return;
          compiling = compiling
            .then(async () => {
              await compileContent({ production: false });
              server.ws.send({ type: 'full-reload' });
            })
            .catch((error) => server.config.logger.error(String(error)));
        });
      },
      configurePreviewServer(server) {
        // Match Cloudflare's static 404 behavior instead of serving the home page.
        return () => {
          server.middlewares.use((request, response, next) => {
            const directory = resolve(server.config.root, server.config.build.outDir);
            const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;
            const asset = resolve(directory, `.${pathname}`);
            if (existsSync(asset) || existsSync(resolve(asset, 'index.html'))) return next();
            readFile(resolve(directory, '404.html'))
              .then((html) => {
                response.statusCode = 404;
                response.setHeader('Content-Type', 'text/html; charset=utf-8');
                response.end(html);
              })
              .catch(next);
          });
        };
      },
    },
    stylex.vite({ devMode: 'full', useCSSLayers: false }),
    foldkit({
      ssr: {
        serverEntry: '/src/entry.server.ts',
        clientEntry: '/src/app/entry.ts',
        build: {
          clientOutDir: 'dist',
          serverOutDir: '.output/server',
          prerender: { origin: 'https://edmundmiller.dev' },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/site-config': fileURLToPath(new URL('./src/site.config.ts', import.meta.url)),
    },
  },
  server: { allowedHosts: ['.onamp.dev'] },
  preview: { allowedHosts: ['.onamp.dev'] },
}));
