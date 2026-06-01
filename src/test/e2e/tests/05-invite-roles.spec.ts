import type { Page } from '@playwright/test'

import { Routes } from 'meta/routes/routes'

import { expect, test } from '../fixtures/auth'
import { AuthUtils } from '../utils/Auth'
import { AssessmentConfig, fraConfig, InviteUtils, panEuropeanConfig } from '../utils/Invite'
import { UserUtils } from '../utils/User'

type RoleConfig = {
  // form required for role
  fillAcceptForm?: (page: Page) => Promise<void>
  role: string
}

const roleConfigs: Array<RoleConfig> = [
  { role: 'National correspondent', fillAcceptForm: InviteUtils.fillRolePropsForm },
  { role: 'Alternate national correspondent', fillAcceptForm: InviteUtils.fillRolePropsForm },
  { role: 'Collaborator', fillAcceptForm: InviteUtils.fillRolePropsForm },
  { role: 'Regional Focal Point' },
  { role: 'Reviewer' },
  { role: 'Viewer' },
]

const assessmentConfigs: Array<AssessmentConfig & { shouldFillForm?: boolean }> = [
  { ...fraConfig, shouldFillForm: true },
  { ...panEuropeanConfig },
]

const testConfigs = assessmentConfigs.flatMap((assessment) =>
  roleConfigs.map((roleConfig) => ({ ...assessment, ...roleConfig }))
)

testConfigs.forEach(({ assessmentName, countryIso, cycleName, fillAcceptForm, role, shouldFillForm }) => {
  const label = `${role} (${assessmentName})`
  const expectedUrl = new RegExp(Routes.Country.generatePath({ assessmentName, cycleName, countryIso }))

  test.describe.serial(`${label} - Logged out new user`, () => {
    const testUser = UserUtils.createTestUser(role)
    let invitationPath: string

    test(`Admin invites ${label}`, async ({ authenticatedPage }) => {
      invitationPath = await InviteUtils.adminInvite(authenticatedPage, testUser, {
        assessmentName,
        countryIso,
        cycleName,
      })
    })

    test(`${label} registers and accepts invitation`, async ({ browser }) => {
      const context = await browser.newContext({ baseURL: test.info().project.use.baseURL })
      const page = await context.newPage()

      await page.goto(invitationPath)

      // Tutorial links visible for new users
      await expect(page.locator('a.btn-help[href*="youtube"]')).toHaveCount(2, { timeout: 30_000 })
      await expect(page.getByText('How to log in with a self-defined password')).toBeVisible()
      await expect(page.getByText('How to log in using Google authentication')).toBeVisible()

      // Forgot password not visible for new users
      await expect(page.getByText('Forgot your password?')).not.toBeVisible()

      await AuthUtils.fillRegisterForm(page, testUser.password)
      if (shouldFillForm && fillAcceptForm) await fillAcceptForm(page)
      else await expect(page.locator('.user-form')).not.toBeVisible()
      await page.getByRole('button', { name: 'Accept Invitation' }).click()
      await expect(page).toHaveURL(expectedUrl)
      await context.close()
    })

    test('Admin confirms no pending badge', async ({ authenticatedPage }) => {
      await InviteUtils.adminConfirmsNoPending(authenticatedPage, testUser.fullName, {
        assessmentName,
        countryIso,
        cycleName,
      })
    })
  })

  test.describe.serial(`${label} - Logged out existing user`, () => {
    const testUser = UserUtils.createTestUser(role)
    let invitationPath: string

    test(`Admin invites ${label}`, async ({ authenticatedPage }) => {
      invitationPath = await InviteUtils.adminInvite(authenticatedPage, testUser, {
        assessmentName,
        countryIso,
        cycleName,
      })
    })

    test(`${label} creates account without accepting`, async ({ browser }) => {
      const context = await browser.newContext({ baseURL: test.info().project.use.baseURL })
      const page = await context.newPage()

      await page.goto(invitationPath)
      await AuthUtils.fillRegisterForm(page, testUser.password)
      // Confirm the accept page loaded and close without accepting
      await expect(page.getByRole('button', { name: 'Accept Invitation' })).toBeVisible()
      await context.close()
    })

    test(`${label} logs in and accepts invitation`, async ({ browser }) => {
      const context = await browser.newContext({ baseURL: test.info().project.use.baseURL })
      const page = await context.newPage()

      await page.goto(invitationPath)
      // Email is pre-filled and disabled, existing user sees only the password field
      await expect(page.locator('input[name="password2"]')).not.toBeVisible()
      await AuthUtils.fillLoginForm(page, testUser.password)
      if (shouldFillForm && fillAcceptForm) await fillAcceptForm(page)
      else await expect(page.locator('.user-form')).not.toBeVisible()
      await page.getByRole('button', { name: 'Accept Invitation' }).click()
      await expect(page).toHaveURL(expectedUrl)
      await context.close()
    })

    test('Admin confirms no pending badge', async ({ authenticatedPage }) => {
      await InviteUtils.adminConfirmsNoPending(authenticatedPage, testUser.fullName, {
        assessmentName,
        countryIso,
        cycleName,
      })
    })
  })

  test.describe.serial(`${label} - Logged in existing user`, () => {
    const testUser = UserUtils.createTestUser(role)
    let invitationPath: string

    test(`Admin invites ${label}`, async ({ authenticatedPage }) => {
      invitationPath = await InviteUtils.adminInvite(authenticatedPage, testUser, {
        assessmentName,
        countryIso,
        cycleName,
      })
    })

    test(`${label} accepts invitation while already logged in`, async ({ browser }) => {
      const context = await browser.newContext({ baseURL: test.info().project.use.baseURL })
      const page = await context.newPage()

      // Register via the form - creates account and sets JWT cookie (user is now logged in)
      await page.goto(invitationPath)
      await AuthUtils.fillRegisterForm(page, testUser.password)

      // Already logged in - Login page redirects straight to the accept form
      await page.goto(invitationPath)
      if (shouldFillForm && fillAcceptForm) await fillAcceptForm(page)
      else await expect(page.locator('.user-form')).not.toBeVisible()
      await page.getByRole('button', { name: 'Accept Invitation' }).click()
      await expect(page).toHaveURL(expectedUrl)
      await context.close()
    })

    test('Admin confirms no pending badge', async ({ authenticatedPage }) => {
      await InviteUtils.adminConfirmsNoPending(authenticatedPage, testUser.fullName, {
        assessmentName,
        countryIso,
        cycleName,
      })
    })
  })

  test.describe.serial(`${label} - Logged in as different user`, () => {
    const testUser = UserUtils.createTestUser(role)
    let invitationPath: string

    test(`Admin invites ${label}`, async ({ authenticatedPage }) => {
      invitationPath = await InviteUtils.adminInvite(authenticatedPage, testUser, {
        assessmentName,
        countryIso,
        cycleName,
      })
    })

    test(`Admin visits ${label} invitation link (wrong user) and sees notification`, async ({ authenticatedPage }) => {
      // Admin is already logged in as a different user
      await authenticatedPage.goto(invitationPath)

      // Should NOT land on the invitation accept form
      await expect(authenticatedPage).not.toHaveURL(/\/login\/invitation\//)
      // Should show a notification explaining the mismatch
      await expect(authenticatedPage.getByText(/linked to a different user/i)).toBeVisible({ timeout: 10_000 })
    })
  })
})
