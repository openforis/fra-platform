import { expect, Page } from '@playwright/test'

type Credentials = { email: string; password: string }

const login = async (page: Page, credentials: Credentials): Promise<void> => {
  const response = await page.request.post('/auth/login', { multipart: credentials })
  expect(response.ok()).toBeTruthy()
}

export const AuthUtils = {
  login,
}
