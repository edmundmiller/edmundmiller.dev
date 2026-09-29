import { bindings, defineConfig, triggers } from 'cf/config';

export default defineConfig({
  worker: {
    name: 'edmundmiller-dev',
    compatibilityDate: '2025-01-16',
    entrypoint: './src/worker.ts',
    assets: {
      runWorkerFirst: true,
    },
    triggers: [
      triggers.fetch({
        pattern: 'edmundmiller.dev/*',
        zone: 'edmundmiller.dev',
      }),
    ],
    env: {
      ASSETS: bindings.assets(),
    },
  },
});
