import { expect, test } from '../fixtures/auth'
import { AuthUtils } from '../utils/Auth'
import { InviteUtils } from '../utils/Invite'
import { UserUtils } from '../utils/User'

test.describe.serial('Reviewer - Logged out new user', () => {
  const testUser = UserUtils.createTestUser('Reviewer')
  let invitationPath: string

  test('Admin invites Reviewer', async ({ authenticatedPage }) => {
    invitationPath = await InviteUtils.adminInvite(authenticatedPage, testUser)
  })

  test('Reviewer registers and accepts invitation', async ({ browser }) => {
    const reviewerContext = await browser.newContext({ baseURL: test.info().project.use.baseURL })
    const reviewerPage = await reviewerContext.newPage()

    await reviewerPage.goto(invitationPath)
    await AuthUtils.fillRegisterForm(reviewerPage, testUser.password)
    await reviewerPage.getByRole('button', { name: 'Accept Invitation' }).click()
    await expect(reviewerPage).toHaveURL(/\/assessments\/fra\/2025\/X01\/home\/overview$/)
    await reviewerContext.close()
  })

  test('Admin confirms no pending badge', async ({ authenticatedPage }) => {
    await InviteUtils.adminConfirmsNoPending(authenticatedPage, testUser.fullName)
  })
})

test.describe.serial('Reviewer - Logged out existing user', () => {
  const testUser = UserUtils.createTestUser('Reviewer')
  let invitationPath: string

  test('Admin invites Reviewer', async ({ authenticatedPage }) => {
    invitationPath = await InviteUtils.adminInvite(authenticatedPage, testUser)
  })

  test('Reviewer creates account without accepting', async ({ browser }) => {
    const reviewerContext = await browser.newContext({ baseURL: test.info().project.use.baseURL })
    const reviewerPage = await reviewerContext.newPage()

    await reviewerPage.goto(invitationPath)
    await AuthUtils.fillRegisterForm(reviewerPage, testUser.password)
    // Wait for accept button -> confirms registration succeeded -> then close without accepting
    await reviewerPage.waitForSelector('button:has-text("Accept Invitation")', { timeout: 30_000 })
    await reviewerContext.close()
  })

  test('Reviewer logs in and accepts invitation', async ({ browser }) => {
    const reviewerContext = await browser.newContext({ baseURL: test.info().project.use.baseURL })
    const reviewerPage = await reviewerContext.newPage()

    await reviewerPage.goto(invitationPath)
    // Email is pre-filled and disabled - existing user sees only the password field
    await AuthUtils.fillLoginForm(reviewerPage, testUser.password)
    await reviewerPage.getByRole('button', { name: 'Accept Invitation' }).click()
    await expect(reviewerPage).toHaveURL(/\/assessments\/fra\/2025\/X01\/home\/overview$/)
    await reviewerContext.close()
  })

  test('Admin confirms no pending badge', async ({ authenticatedPage }) => {
    await InviteUtils.adminConfirmsNoPending(authenticatedPage, testUser.fullName)
  })
})

test.describe.serial('Reviewer - Logged in existing user', () => {
  const testUser = UserUtils.createTestUser('Reviewer')
  let invitationPath: string

  test('Admin invites Reviewer', async ({ authenticatedPage }) => {
    invitationPath = await InviteUtils.adminInvite(authenticatedPage, testUser)
  })

  test('Reviewer accepts invitation while already logged in', async ({ browser }) => {
    const reviewerContext = await browser.newContext({ baseURL: test.info().project.use.baseURL })
    const reviewerPage = await reviewerContext.newPage()

    // Register new user and log in
    await reviewerPage.goto(invitationPath)
    await AuthUtils.fillRegisterForm(reviewerPage, testUser.password)

    // Navigate to invitation
    await reviewerPage.goto(invitationPath)
    await reviewerPage.getByRole('button', { name: 'Accept Invitation' }).click()
    await expect(reviewerPage).toHaveURL(/\/assessments\/fra\/2025\/X01\/home\/overview$/)
    await reviewerContext.close()
  })

  test('Admin confirms no pending badge', async ({ authenticatedPage }) => {
    await InviteUtils.adminConfirmsNoPending(authenticatedPage, testUser.fullName)
  })
})

test.describe.serial('Reviewer - Logged in as different user', () => {
  const testUser = UserUtils.createTestUser('Reviewer')
  let invitationPath: string

  test('Admin invites Reviewer', async ({ authenticatedPage }) => {
    invitationPath = await InviteUtils.adminInvite(authenticatedPage, testUser)
  })

  test('Admin visits Reviewer invitation link (wrong user) and sees notification', async ({ authenticatedPage }) => {
    // Admin is already logged in as a different user
    await authenticatedPage.goto(invitationPath)

    // Should NOT land on the invitation accept form
    await expect(authenticatedPage).not.toHaveURL(/\/login\/invitation\//)
    // Should show a notification explaining the mismatch
    await expect(authenticatedPage.getByText(/linked to a different user/i)).toBeVisible({ timeout: 10_000 })
  })
})
