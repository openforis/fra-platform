import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: __dirname,
  testMatch: [
    'specs/**/*.spec.ts',
    /** @deprecated */
    'tests/**/*.spec.ts',
  ],
  timeout: 10_0000,
  retries: 2,
  expect: {
    timeout: 2000,
  },
  use: {
    baseURL: process.env.BASE_URL || 'http://web:9001',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    headless: true,
    actionTimeout: 5_000,
    navigationTimeout: 5_000,
  },

  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
      },
    },
  ],

  reporter: [['list'], ['html', { outputFolder: 'test-results', open: 'never' }]],
}

export default config
