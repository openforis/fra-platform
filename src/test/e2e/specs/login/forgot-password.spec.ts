import { type Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { Routes } from 'meta/routes/routes'
import { RoleName } from 'meta/user/role/name'

import { expect, test } from 'test/e2e/fixtures/user'
import { AuthUtils } from 'test/e2e/utils/Auth'
import { DOMUtils } from 'test/e2e/utils/dom'
import { MailUtil } from 'test/e2e/utils/Mail'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const loginPath = Routes.Login.generatePath({ assessmentName, cycleName })

const newPassword = 'newPassword123!'

const _requestPasswordReset = async (page: Page, email: string): Promise<void> => {
  await page.goto(loginPath)
  await page.getByRole('link', { name: enTranslation.login.forgotPassword }).click()
  await expect(page.getByRole('heading', { name: enTranslation.login.forgotPasswordTitle })).toBeVisible()
  await page.fill('input[name="email"]', email)

  const resetRequested = DOMUtils.waitForResponse(page, ApiEndPoint.Auth.resetPassword(), 'POST')
  await page.getByRole('button', { name: enTranslation.login.resetPassword }).click()
  await resetRequested

  await expect(page.getByText(enTranslation.login.passwordResetSent)).toBeVisible()
}

const _openResetPasswordLink = async (page: Page, resetPasswordPath: string): Promise<void> => {
  const linkChecked = DOMUtils.waitForResponse(page, ApiEndPoint.User.resetPassword(), 'GET')
  await page.goto(resetPasswordPath)
  await linkChecked
}

test.describe('Login: forgot password', () => {
  // The reset doesn't depend on the role or the country, so this uses an NC of BGR like the message center specs
  test.use({ userSeed: { assessmentName, countryIso: 'BGR', cycleName, role: RoleName.NATIONAL_CORRESPONDENT } })

  test('NC resets a forgotten password and logs in with the new one', async ({ publicPage, user }) => {
    const page = publicPage
    const nc = user

    const resetPasswordPath = await test.step('NC asks for a reset and gets the email', async () => {
      await _requestPasswordReset(page, nc.email)
      return MailUtil.getResetPasswordLink(nc.email)
    })

    await test.step('NC sets a new password from the email link', async () => {
      await _openResetPasswordLink(page, resetPasswordPath)
      const emailInput = page.locator('input[name="email"]')
      await expect(emailInput).toHaveValue(nc.email)
      await expect(emailInput).toBeDisabled()

      await page.fill('input[name="password"]', newPassword)
      await page.fill('input[name="password2"]', newPassword)
      const passwordChanged = DOMUtils.waitForResponse(page, ApiEndPoint.Auth.login(), 'POST')
      await page.getByRole('button', { name: enTranslation.common.submit }).click()
      await passwordChanged

      await expect(page.getByText(enTranslation.login.passwordChanged)).toBeVisible()
    })

    await test.step('NC opens the used link and sees it expired', async () => {
      await _openResetPasswordLink(page, resetPasswordPath)

      await expect(page.getByText(enTranslation.login.expired)).toBeVisible()
    })

    await test.step('NC logs in with the new password', async () => {
      // Changing the password logs the NC in, so clearing the cookies logs them out
      await page.context().clearCookies()
      await page.goto(loginPath)
      await page.fill('input[name="email"]', nc.email)

      const loggedIn = DOMUtils.waitForResponse(page, ApiEndPoint.Auth.login(), 'POST')
      await AuthUtils.fillLoginForm(page, newPassword)
      await loggedIn

      await expect(page.locator('.app-header').getByText(nc.fullName)).toBeVisible()
    })
  })

  test('NC asks for a reset twice and can still use the link from the first email', async ({ publicPage, user }) => {
    const page = publicPage
    const nc = user

    await _requestPasswordReset(page, nc.email)
    const resetPasswordPath = await MailUtil.getResetPasswordLink(nc.email)
    // A second request within five minutes keeps the first link instead of sending a new one
    await _requestPasswordReset(page, nc.email)

    await _openResetPasswordLink(page, resetPasswordPath)

    await expect(page.locator('input[name="email"]')).toHaveValue(nc.email)
  })
})
