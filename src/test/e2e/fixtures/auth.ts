import { Cookie, Page, test as base } from '@playwright/test'

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

type AuthWorkerFixtures = {
  // The admin logs in once per worker and every test reuses the cookies
  adminCookies: Array<Cookie>
}

export const test = base.extend<AuthFixtures, AuthWorkerFixtures>({
  adminCookies: [
    async ({ browser }, use, workerInfo): Promise<void> => {
      const context = await browser.newContext({ baseURL: workerInfo.project.use.baseURL })
      const page = await context.newPage()
      await AuthUtils.login(page, testCredentials)
      const { cookies } = await context.storageState()
      await context.close()

      await use(cookies)
    },
    { scope: 'worker' },
  ],

  authenticatedPage: async ({ adminCookies, page }, use) => {
    await page.context().addCookies(adminCookies)
    await use(page)
  },

  otherAuthenticatedPage: async ({ adminCookies, baseURL, browser }, use) => {
    const context = await browser.newContext({ baseURL })
    await context.addCookies(adminCookies)
    const page = await context.newPage()

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
