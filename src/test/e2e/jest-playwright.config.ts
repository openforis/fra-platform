import path from 'path'
import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: path.join(__dirname, 'tests'),
  testMatch: ['**/*.spec.ts'],
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

  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'test-results',
        port: 9323,
        host: '0.0.0.0',
        open: 'always', // Remove this or change to 'on-failure'
      },
    ],
  ],
}

export default config
