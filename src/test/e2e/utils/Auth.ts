import { expect, Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

type Credentials = { email: string; password: string }

const login = async (page: Page, credentials: Credentials): Promise<void> => {
  const response = await page.request.post('/auth/login', { multipart: credentials })
  expect(response.ok()).toBeTruthy()
}

const fillRegisterForm = async (page: Page, password: string): Promise<void> => {
  await page.fill('input[name="password"]', password)
  await page.fill('input[name="password2"]', password)
  await page.getByRole('button', { name: enTranslation.login.signInFRA }).click()
  await page.waitForURL(/\/login\/invitation\//, { timeout: 30_000 })
}

const fillLoginForm = async (page: Page, password: string): Promise<void> => {
  await page.fill('input[name="password"]', password)
  await page.getByRole('button', { name: enTranslation.login.signInFRA }).click()
}

export const AuthUtils = {
  fillLoginForm,
  fillRegisterForm,
  login,
}
