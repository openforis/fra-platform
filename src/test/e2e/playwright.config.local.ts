import { PlaywrightTestConfig } from '@playwright/test'

import baseConfig from './playwright.config'

const config: PlaywrightTestConfig = {
  ...baseConfig,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  use: {
    ...baseConfig.use,
    headless: false,
    baseURL: 'http://localhost:9000',
    launchOptions: {
      slowMo: 500,
    },
    trace: 'on-first-retry',
    actionTimeout: 25_000,
    navigationTimeout: 25_000,
  },
}

export default config
