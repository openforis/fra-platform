import { expect, Page, test as base } from '@playwright/test'

import { testCredentials } from '../config/credentials'

type AuthFixtures = {
  authenticatedPage: Page
}

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Login via API
    const response = await page.request.post('/auth/login', { multipart: testCredentials })
    expect(response.ok()).toBeTruthy()

    // The cookie is automatically set by the response
    await use(page)
  },
})

export { expect } from '@playwright/test'
