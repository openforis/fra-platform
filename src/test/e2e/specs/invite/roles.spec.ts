import type { Browser, Page, TestInfo } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { Routes } from 'meta/routes/routes'
import { RoleName } from 'meta/user/role/name'

import { InviteApi } from 'test/e2e/api/invite'
import { testCredentials } from 'test/e2e/config/credentials'
import { Timeouts } from 'test/e2e/config/timeouts'
import { expect, test } from 'test/e2e/fixtures/auth'
import { AuthUtils } from 'test/e2e/utils/Auth'
import { AssessmentConfig, fraConfig, InviteUtils, panEuropeanConfig } from 'test/e2e/utils/Invite'
import { type TestUserData, UserUtils } from 'test/e2e/utils/User'

type RoleConfig = {
  // form required for role
  fillAcceptForm?: (page: Page) => Promise<void>
  role: RoleName
}

const roleConfigs: Array<RoleConfig> = [
  { role: RoleName.NATIONAL_CORRESPONDENT, fillAcceptForm: InviteUtils.fillRolePropsForm },
  { role: RoleName.ALTERNATE_NATIONAL_CORRESPONDENT, fillAcceptForm: InviteUtils.fillRolePropsForm },
  { role: RoleName.COLLABORATOR, fillAcceptForm: InviteUtils.fillRolePropsForm },
  { role: RoleName.REGIONAL_FOCAL_POINT },
  { role: RoleName.REVIEWER },
  { role: RoleName.VIEWER },
]

// For panEuropean, only test the roles which have accept form in FRA
const panEuropeanRoleConfigs: Array<RoleConfig> = roleConfigs.filter(({ fillAcceptForm }) => fillAcceptForm)

const assessmentConfigs: Array<AssessmentConfig & { roles?: Array<RoleConfig>; shouldFillForm?: boolean }> = [
  { ...fraConfig, shouldFillForm: true },
  { ...panEuropeanConfig, roles: panEuropeanRoleConfigs },
]

const testConfigs = assessmentConfigs.flatMap(({ roles = roleConfigs, ...assessment }) =>
  roles.map((roleConfig) => ({ ...assessment, ...roleConfig }))
)

testConfigs.forEach(({ assessmentName, countryIso, cycleName, fillAcceptForm, role, shouldFillForm }) => {
  const roleLabel = enTranslation.user.roles[role]
  const label = `${roleLabel} (${assessmentName})`
  const expectedUrl = new RegExp(Routes.Country.generatePath({ assessmentName, cycleName, countryIso }))

  // Seed invitations via API

  const seedInvitation = async (browser: Browser, testInfo: TestInfo, testUser: TestUserData): Promise<string> => {
    const context = await browser.newContext({ baseURL: testInfo.project.use.baseURL })
    const page = await context.newPage()
    await AuthUtils.login(page, testCredentials)
    const invitationPath = await InviteApi.create(page, { assessmentName, countryIso, cycleName, role, testUser })
    await context.close()
    return invitationPath
  }

  test.describe.serial(`${label} - Logged out new user`, () => {
    const testUser = UserUtils.createTestUser(roleLabel)
    let invitationPath: string

    test.beforeAll(async ({ browser }, testInfo) => {
      invitationPath = await seedInvitation(browser, testInfo, testUser)
    })

    test(`${label} registers and accepts invitation and Admin sees no pending badge`, async ({
      authenticatedPage,
      browser,
    }) => {
      await test.step(`${label} registers and accepts invitation`, async () => {
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

      await test.step('Admin confirms no pending badge', async () => {
        await InviteUtils.adminConfirmsNoPending(authenticatedPage, testUser.fullName, {
          assessmentName,
          countryIso,
          cycleName,
        })
      })
    })
  })

  test.describe.serial(`${label} - Logged out existing user`, () => {
    const testUser = UserUtils.createTestUser(roleLabel)
    let invitationPath: string

    test.beforeAll(async ({ browser }, testInfo) => {
      invitationPath = await seedInvitation(browser, testInfo, testUser)
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

    test(`${label} logs in and accepts invitation and Admin sees no pending badge`, async ({
      authenticatedPage,
      browser,
    }) => {
      await test.step(`${label} logs in and accepts invitation`, async () => {
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

      await test.step('Admin confirms no pending badge', async () => {
        await InviteUtils.adminConfirmsNoPending(authenticatedPage, testUser.fullName, {
          assessmentName,
          countryIso,
          cycleName,
        })
      })
    })
  })

  test.describe.serial(`${label} - Logged in existing user`, () => {
    const testUser = UserUtils.createTestUser(roleLabel)
    let invitationPath: string

    test.beforeAll(async ({ browser }, testInfo) => {
      invitationPath = await seedInvitation(browser, testInfo, testUser)
    })

    test(`${label} accepts invitation while already logged in and Admin sees no pending badge`, async ({
      authenticatedPage,
      browser,
    }) => {
      await test.step(`${label} accepts invitation while already logged in`, async () => {
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

      await test.step('Admin confirms no pending badge', async () => {
        await InviteUtils.adminConfirmsNoPending(authenticatedPage, testUser.fullName, {
          assessmentName,
          countryIso,
          cycleName,
        })
      })
    })
  })

  // Opening another user's invitation shows the same error whatever the role, so it's only tested once, as FRA NC
  if (role === RoleName.NATIONAL_CORRESPONDENT && assessmentName === fraConfig.assessmentName) {
    test.describe.serial(`${label} - Logged in as different user`, () => {
      const testUser = UserUtils.createTestUser(roleLabel)
      let invitationPath: string

      test.beforeAll(async ({ browser }, testInfo) => {
        invitationPath = await seedInvitation(browser, testInfo, testUser)
      })

      test(`Admin visits ${label} invitation link (wrong user) and sees notification`, async ({
        authenticatedPage,
      }) => {
        // Admin is already logged in as a different user
        await authenticatedPage.goto(invitationPath)

        // Should NOT land on the invitation accept form
        await expect(authenticatedPage).not.toHaveURL(/\/login\/invitation\//)
        // Should show a notification explaining the mismatch
        await expect(authenticatedPage.getByText(/linked to a different user/i)).toBeVisible({
          timeout: Timeouts.medium,
        })
      })
    })
  }
})
