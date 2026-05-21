import { expect, test } from '../fixtures/auth'
import { AuthUtils } from '../utils/Auth'
import { InviteUtils } from '../utils/Invite'
import { UserUtils } from '../utils/User'

test.describe.serial('NC - Logged out new user', () => {
  const testUser = UserUtils.createTestUser('National correspondent')
  let invitationPath: string

  test('Admin invites NC', async ({ authenticatedPage }) => {
    invitationPath = await InviteUtils.adminInvite(authenticatedPage, testUser)
  })

  test('NC registers and accepts invitation', async ({ browser }) => {
    const ncContext = await browser.newContext({ baseURL: test.info().project.use.baseURL })
    const ncPage = await ncContext.newPage()

    await ncPage.goto(invitationPath)
    await AuthUtils.fillRegisterForm(ncPage, testUser.password)
    await InviteUtils.fillNcAcceptForm(ncPage)
    await ncPage.getByRole('button', { name: 'Accept Invitation' }).click()
    await expect(ncPage).toHaveURL(/\/assessments\/fra\/2025\/X01\/home\/overview$/)
    await ncContext.close()
  })

  test('Admin confirms no pending badge', async ({ authenticatedPage }) => {
    await InviteUtils.adminConfirmsNoPending(authenticatedPage, testUser.fullName)
  })
})

test.describe.serial('NC - Logged out existing user', () => {
  const testUser = UserUtils.createTestUser('National correspondent')
  let invitationPath: string

  test('Admin invites NC', async ({ authenticatedPage }) => {
    invitationPath = await InviteUtils.adminInvite(authenticatedPage, testUser)
  })

  test('NC creates account without accepting', async ({ browser }) => {
    const ncContext = await browser.newContext({ baseURL: test.info().project.use.baseURL })
    const ncPage = await ncContext.newPage()

    await ncPage.goto(invitationPath)
    await AuthUtils.fillRegisterForm(ncPage, testUser.password)
    // Wait for the accept page — confirms registration succeeded — then close without accepting
    await ncPage.waitForSelector('[id="select-user.props.title"]', { timeout: 30_000 })
    await ncContext.close()
  })

  test('NC logs in and accepts invitation', async ({ browser }) => {
    const ncContext = await browser.newContext({ baseURL: test.info().project.use.baseURL })
    const ncPage = await ncContext.newPage()

    await ncPage.goto(invitationPath)
    // Email is pre-filled and disabled — existing user sees only the password field
    await AuthUtils.fillLoginForm(ncPage, testUser.password)
    await InviteUtils.fillNcAcceptForm(ncPage)
    await ncPage.getByRole('button', { name: 'Accept Invitation' }).click()
    await expect(ncPage).toHaveURL(/\/assessments\/fra\/2025\/X01\/home\/overview$/)
    await ncContext.close()
  })

  test('Admin confirms no pending badge', async ({ authenticatedPage }) => {
    await InviteUtils.adminConfirmsNoPending(authenticatedPage, testUser.fullName)
  })
})

test.describe.serial('NC - Logged in existing user', () => {
  const testUser = UserUtils.createTestUser('National correspondent')
  let invitationPath: string

  test('Admin invites NC', async ({ authenticatedPage }) => {
    invitationPath = await InviteUtils.adminInvite(authenticatedPage, testUser)
  })

  test('NC accepts invitation while already logged in', async ({ browser }) => {
    const ncContext = await browser.newContext({ baseURL: test.info().project.use.baseURL })
    const ncPage = await ncContext.newPage()

    // Register via the form — creates account and sets JWT cookie (user is now logged in)
    await ncPage.goto(invitationPath)
    await AuthUtils.fillRegisterForm(ncPage, testUser.password)

    // Already logged in — Login page redirects straight to the accept form
    await ncPage.goto(invitationPath)
    await InviteUtils.fillNcAcceptForm(ncPage)
    await ncPage.getByRole('button', { name: 'Accept Invitation' }).click()
    await expect(ncPage).toHaveURL(/\/assessments\/fra\/2025\/X01\/home\/overview$/)
    await ncContext.close()
  })

  test('Admin confirms no pending badge', async ({ authenticatedPage }) => {
    await InviteUtils.adminConfirmsNoPending(authenticatedPage, testUser.fullName)
  })
})

test.describe.serial('NC - Logged in as different user', () => {
  const testUser = UserUtils.createTestUser('National correspondent')
  let invitationPath: string

  test('Admin invites NC', async ({ authenticatedPage }) => {
    invitationPath = await InviteUtils.adminInvite(authenticatedPage, testUser)
  })

  test('Admin visits NC invitation link (wrong user) and sees notification', async ({ authenticatedPage }) => {
    // Admin is already logged in as a different user
    await authenticatedPage.goto(invitationPath)

    // Should NOT land on the invitation accept form
    await expect(authenticatedPage).not.toHaveURL(/\/login\/invitation\//)
    // Should show a notification explaining the mismatch
    await expect(authenticatedPage.getByText(/linked to a different user/i)).toBeVisible({ timeout: 10_000 })
  })
})
