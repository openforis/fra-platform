import type { Browser, Page, TestInfo } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { Routes } from 'meta/routes/routes'
import { RoleName } from 'meta/user/role/name'
import { Numbers } from 'utils/numbers'

import { InviteApiUtils } from 'test/e2e/api/invite'
import { testCredentials } from 'test/e2e/config/credentials'
import { expect, test } from 'test/e2e/fixtures/auth'
import { AuthUtils } from 'test/e2e/utils/Auth'
import { DOMUtils } from 'test/e2e/utils/dom'
import { AssessmentConfig, fraConfig, InviteUtils, panEuropeanConfig } from 'test/e2e/utils/Invite'
import { TableDomUtils } from 'test/e2e/utils/table'
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
    const invitationPath = await InviteApiUtils.create(page, { assessmentName, countryIso, cycleName, role, testUser })
    await context.close()
    return invitationPath
  }

  test.describe.serial(`${label} - Logged out new user`, () => {
    const testUser = UserUtils.createTestUser(roleLabel)
    let invitationPath: string

    test.beforeAll(async ({ browser }, testInfo) => {
      invitationPath = await seedInvitation(browser, testInfo, testUser)
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

    if (role === RoleName.NATIONAL_CORRESPONDENT && assessmentName === fraConfig.assessmentName) {
      test(`${label} edits cell in table 1a with correct and incorrect values`, async ({ browser }) => {
        const ncContext = await browser.newContext({ baseURL: test.info().project.use.baseURL })
        const ncPage = await ncContext.newPage()
        await AuthUtils.login(ncPage, { email: testUser.email, password: testUser.password })

        // Navigate using sidebar and unlock editing
        await ncPage.goto(`/assessments/${assessmentName}/${cycleName}/${countryIso}/home`)
        await DOMUtils.sidebarNavigate(ncPage, 'Forest extent, characteristics and changes', 'Extent of forest')
        await DOMUtils.ensureEditingUnlocked(ncPage)

        // Clear table
        await TableDomUtils.clearTable(ncPage, 'extentOfForest')
        await TableDomUtils.expectCellValue(ncPage, 'forestArea', '1990', '')

        const totalLandArea = await TableDomUtils.getCellValue(ncPage, 'totalLandArea', '1990')

        // Fill cell (forest area, 1990) with non-error value
        const forestAreaValue = 500
        await TableDomUtils.fillCell(ncPage, 'forestArea', '1990', String(forestAreaValue))
        // Check calculation for other land updates and passes
        const expectedOtherLand = Numbers.toFixed(Numbers.sub(totalLandArea, forestAreaValue))
        await TableDomUtils.expectCellValue(ncPage, 'otherLand', '1990', expectedOtherLand)
        // Expect no error
        await TableDomUtils.expectTableHasNoError(ncPage, 'extentOfForest')

        // Fill cell (forest area, 1990) with error value
        const forestAreaValueError = 999999
        await TableDomUtils.fillCell(ncPage, 'forestArea', '2000', String(forestAreaValueError))
        // Expect error (wait for validation to update)
        await TableDomUtils.expectTableHasError(ncPage, 'extentOfForest')

        // Clear table
        await TableDomUtils.clearTable(ncPage, 'extentOfForest')
        await TableDomUtils.expectCellValue(ncPage, 'forestArea', '1990', '')

        await ncContext.close()
      })
    }
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
    const testUser = UserUtils.createTestUser(roleLabel)
    let invitationPath: string

    test.beforeAll(async ({ browser }, testInfo) => {
      invitationPath = await seedInvitation(browser, testInfo, testUser)
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
    const testUser = UserUtils.createTestUser(roleLabel)
    let invitationPath: string

    test.beforeAll(async ({ browser }, testInfo) => {
      invitationPath = await seedInvitation(browser, testInfo, testUser)
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
