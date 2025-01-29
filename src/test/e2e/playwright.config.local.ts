import { PlaywrightTestConfig } from '@playwright/test'

import baseConfig from './playwright.config'

const config: PlaywrightTestConfig = {
  ...baseConfig,
  fullyParallel: true,
  retries: 0,
  use: {
    ...baseConfig.use,
    headless: false,
    baseURL: 'http://localhost:9000',
    launchOptions: {
      slowMo: 100,
    },
    trace: 'on-first-retry',
  },
}

export default config
