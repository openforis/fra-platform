import { expect, Page } from '@playwright/test'

type Credentials = { email: string; password: string }

const login = async (page: Page, credentials: Credentials): Promise<void> => {
  const response = await page.request.post('/auth/login', { multipart: credentials })
  expect(response.ok()).toBeTruthy()
}

const fillRegisterForm = async (page: Page, password: string): Promise<void> => {
  await page.fill('input[name="password"]', password)
  await page.fill('input[name="password2"]', password)
  await page.click('button.button:has-text("Sign in with FRA")')
  await page.waitForURL(/\/login\/invitation\//, { timeout: 30_000 })
}

const fillLoginForm = async (page: Page, password: string): Promise<void> => {
  await page.fill('input[name="password"]', password)
  await page.click('button.button:has-text("Sign in with FRA")')
}

export const AuthUtils = {
  fillLoginForm,
  fillRegisterForm,
  login,
}
