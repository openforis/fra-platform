import { expect, Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { ApiEndPoint } from 'meta/api/endpoint'

import { DOMUtils } from 'test/e2e/utils/dom'

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

const requestPasswordReset = async (page: Page, email: string): Promise<void> => {
  await page.getByRole('link', { name: enTranslation.login.forgotPassword }).click()
  await expect(page.getByRole('heading', { name: enTranslation.login.forgotPasswordTitle })).toBeVisible()
  await page.fill('input[name="email"]', email)

  const resetRequested = DOMUtils.waitForResponse(page, ApiEndPoint.Auth.resetPassword(), 'POST')
  await page.getByRole('button', { name: enTranslation.login.resetPassword }).click()
  await resetRequested

  await expect(page.getByText(enTranslation.login.passwordResetSent)).toBeVisible()
}

const openResetPasswordLink = async (page: Page, resetPasswordPath: string): Promise<void> => {
  const linkChecked = DOMUtils.waitForResponse(page, ApiEndPoint.User.resetPassword(), 'GET')
  await page.goto(resetPasswordPath)
  await linkChecked
}

export const AuthUtils = {
  fillLoginForm,
  fillRegisterForm,
  login,
  openResetPasswordLink,
  requestPasswordReset,
}
