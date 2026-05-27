import type { Page } from '@playwright/test'

import { expect, test } from '../fixtures/auth'
import { AuthUtils } from '../utils/Auth'
import { InviteUtils } from '../utils/Invite'
import { UserUtils } from '../utils/User'

type RoleConfig = {
  fillAcceptForm?: (page: Page) => Promise<void>
  role: string
}

// fillAcceptForm: expect the form to be visible and required before accepting the invitation
const roleConfigs: Array<RoleConfig> = [
  { role: 'National correspondent', fillAcceptForm: InviteUtils.fillRolePropsForm },
  { role: 'Alternate national correspondent', fillAcceptForm: InviteUtils.fillRolePropsForm },
  { role: 'Collaborator', fillAcceptForm: InviteUtils.fillRolePropsForm },
  { role: 'Regional Focal Point' },
  { role: 'Reviewer' },
  { role: 'Viewer' },
]

roleConfigs.forEach(({ fillAcceptForm, role }) => {
  test.describe.serial(`${role} - Logged out new user`, () => {
    const testUser = UserUtils.createTestUser(role)
    let invitationPath: string

    test(`Admin invites ${role}`, async ({ authenticatedPage }) => {
      invitationPath = await InviteUtils.adminInvite(authenticatedPage, testUser)
    })

    test(`${role} registers and accepts invitation`, async ({ browser }) => {
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
      if (fillAcceptForm) await fillAcceptForm(page)
      await page.getByRole('button', { name: 'Accept Invitation' }).click()
      await expect(page).toHaveURL(/\/assessments\/fra\/2025\/X01\/home\/overview$/)
      await context.close()
    })

    test('Admin confirms no pending badge', async ({ authenticatedPage }) => {
      await InviteUtils.adminConfirmsNoPending(authenticatedPage, testUser.fullName)
    })
  })

  test.describe.serial(`${role} - Logged out existing user`, () => {
    const testUser = UserUtils.createTestUser(role)
    let invitationPath: string

    test(`Admin invites ${role}`, async ({ authenticatedPage }) => {
      invitationPath = await InviteUtils.adminInvite(authenticatedPage, testUser)
    })

    test(`${role} creates account without accepting`, async ({ browser }) => {
      const context = await browser.newContext({ baseURL: test.info().project.use.baseURL })
      const page = await context.newPage()

      await page.goto(invitationPath)
      await AuthUtils.fillRegisterForm(page, testUser.password)
      // Confirm the accept page loaded and close without accepting
      await expect(page.getByRole('button', { name: 'Accept Invitation' })).toBeVisible()
      await context.close()
    })

    test(`${role} logs in and accepts invitation`, async ({ browser }) => {
      const context = await browser.newContext({ baseURL: test.info().project.use.baseURL })
      const page = await context.newPage()

      await page.goto(invitationPath)
      // Email is pre-filled and disabled, existing user sees only the password field
      await expect(page.locator('input[name="password2"]')).not.toBeVisible()
      await AuthUtils.fillLoginForm(page, testUser.password)
      if (fillAcceptForm) await fillAcceptForm(page)
      await page.getByRole('button', { name: 'Accept Invitation' }).click()
      await expect(page).toHaveURL(/\/assessments\/fra\/2025\/X01\/home\/overview$/)
      await context.close()
    })

    test('Admin confirms no pending badge', async ({ authenticatedPage }) => {
      await InviteUtils.adminConfirmsNoPending(authenticatedPage, testUser.fullName)
    })
  })

  test.describe.serial(`${role} - Logged in existing user`, () => {
    const testUser = UserUtils.createTestUser(role)
    let invitationPath: string

    test(`Admin invites ${role}`, async ({ authenticatedPage }) => {
      invitationPath = await InviteUtils.adminInvite(authenticatedPage, testUser)
    })

    test(`${role} accepts invitation while already logged in`, async ({ browser }) => {
      const context = await browser.newContext({ baseURL: test.info().project.use.baseURL })
      const page = await context.newPage()

      // Register via the form - creates account and sets JWT cookie (user is now logged in)
      await page.goto(invitationPath)
      await AuthUtils.fillRegisterForm(page, testUser.password)

      // Already logged in - Login page redirects straight to the accept form
      await page.goto(invitationPath)
      if (fillAcceptForm) await fillAcceptForm(page)
      await page.getByRole('button', { name: 'Accept Invitation' }).click()
      await expect(page).toHaveURL(/\/assessments\/fra\/2025\/X01\/home\/overview$/)
      await context.close()
    })

    test('Admin confirms no pending badge', async ({ authenticatedPage }) => {
      await InviteUtils.adminConfirmsNoPending(authenticatedPage, testUser.fullName)
    })
  })

  test.describe.serial(`${role} - Logged in as different user`, () => {
    const testUser = UserUtils.createTestUser(role)
    let invitationPath: string

    test(`Admin invites ${role}`, async ({ authenticatedPage }) => {
      invitationPath = await InviteUtils.adminInvite(authenticatedPage, testUser)
    })

    test(`Admin visits ${role} invitation link (wrong user) and sees notification`, async ({ authenticatedPage }) => {
      // Admin is already logged in as a different user
      await authenticatedPage.goto(invitationPath)

      // Should NOT land on the invitation accept form
      await expect(authenticatedPage).not.toHaveURL(/\/login\/invitation\//)
      // Should show a notification explaining the mismatch
      await expect(authenticatedPage.getByText(/linked to a different user/i)).toBeVisible({ timeout: 10_000 })
    })
  })
})
