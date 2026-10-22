import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/site',
  use: {
    baseURL: 'http://127.0.0.1:4323',
    colorScheme: 'light',
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
  },
  webServer: {
    command: 'pnpm preview --host 127.0.0.1 --port 4323 --strictPort',
    url: 'http://127.0.0.1:4323',
    reuseExistingServer: !process.env.CI,
  },
});
