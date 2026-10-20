import { Page, test as base } from '@playwright/test'

import { testCredentials } from '../config/credentials'
import { AuthUtils } from '../utils/Auth'

type AuthFixtures = {
  authenticatedPage: Page
  // A second logged in browser.
  // Useful when testing syncing or websockets between clients
  otherAuthenticatedPage: Page
  // A page where the user is not logged in
  publicPage: Page
}

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await AuthUtils.login(page, testCredentials)
    await use(page)
  },

  otherAuthenticatedPage: async ({ baseURL, browser }, use) => {
    const context = await browser.newContext({ baseURL })
    const page = await context.newPage()
    await AuthUtils.login(page, testCredentials)

    await use(page)

    await context.close()
  },

  publicPage: async ({ baseURL, browser }, use) => {
    // Fresh context: other fixtures may have logged in on the default page
    const context = await browser.newContext({ baseURL })
    const page = await context.newPage()

    await use(page)

    await context.close()
  },
})

export { expect } from '@playwright/test'
