import { Page, test as base } from '@playwright/test'

import { testCredentials } from '../config/credentials'
import { AuthUtils } from '../utils/Auth'

type AuthFixtures = {
  authenticatedPage: Page
}

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await AuthUtils.login(page, testCredentials)
    await use(page)
  },
})

export { expect } from '@playwright/test'
