import type { Page } from '@playwright/test'

import { expect, test } from '../fixtures/auth'
import { DOMUtils } from '../utils/DOM'
import { MailUtil } from '../utils/Mail'
import { TestUserData, UserUtils } from '../utils/User'

const adminInviteNc = async (page: Page, testUser: TestUserData): Promise<string> => {
  const { email, fullName, name, role, surname } = testUser

  await page.goto('/assessments/fra/2025/X01/home/collaborators')
  await page.getByRole('link', { name: 'Add collaborator' }).click()
  await page.fill('input[name="name"]', name)
  await page.fill('input[name="surname"]', surname)
  await page.fill('input[name="email"]', email)
  await DOMUtils.selectOption(page, { id: 'select-role' }, role)
  await page.getByRole('button', { name: 'Submit' }).click()

  const userCard = page.locator('.home-user-card', { hasText: fullName })
  await expect(userCard).toBeVisible()
  await expect(userCard.locator('.invitation-badge')).toHaveText('Pending')

  return MailUtil.getInvitationLink(email)
}

const fillAcceptForm = async (page: Page): Promise<void> => {
  await page.waitForSelector('[id="select-user.props.title"]', { timeout: 30_000 })
  await DOMUtils.selectOption(page, { id: 'select-user.props.title' }, 'Mr.')
  await DOMUtils.fillWYSIWYG(page, { id: 'role.props.organization' }, 'Test Organization')
  await DOMUtils.fillInput(page, { id: 'role.props.address.street' }, 'Test Street 1')
  await DOMUtils.fillInput(page, { id: 'role.props.address.zipCode' }, '00100')
  await DOMUtils.fillInput(page, { id: 'role.props.address.city' }, 'Helsinki')
  await DOMUtils.nestedSelectOption(page, { id: 'select-role.props.address.countryIso' }, 'Finland')
  await DOMUtils.fillInput(page, { id: 'role.props.primaryPhoneNumber-phone-number' }, '123456789')
  await DOMUtils.selectOption(page, { id: 'select-role.props.contactPreference.method' }, 'Primary email address')
}

const adminConfirmsNoPending = async (page: Page, fullName: string): Promise<void> => {
  await page.goto('/assessments/fra/2025/X01/home/collaborators')
  const userCard = page.locator('.home-user-card', { hasText: fullName })
  await expect(userCard).toBeVisible()
  await DOMUtils.elementNotExists(userCard.locator('.invitation-badge'))
}

test.describe.serial('NC - Logged out new user', () => {
  const testUser = UserUtils.createTestUser('National correspondent')
  let invitationPath: string

  test('Admin invites NC', async ({ authenticatedPage }) => {
    invitationPath = await adminInviteNc(authenticatedPage, testUser)
  })

  test('NC registers and accepts invitation', async ({ browser }) => {
    const ncContext = await browser.newContext({ baseURL: test.info().project.use.baseURL })
    const ncPage = await ncContext.newPage()

    await ncPage.goto(invitationPath)
    await ncPage.fill('input[name="password"]', testUser.password)
    await ncPage.fill('input[name="password2"]', testUser.password)
    await ncPage.click('button.button:has-text("Sign in with FRA")')

    await fillAcceptForm(ncPage)
    await ncPage.getByRole('button', { name: 'Accept Invitation' }).click()
    await expect(ncPage).toHaveURL(/\/assessments\/fra\/2025\/X01\/home\/overview$/)
    await ncContext.close()
  })

  test('Admin confirms no pending badge', async ({ authenticatedPage }) => {
    await adminConfirmsNoPending(authenticatedPage, testUser.fullName)
  })
})

test.describe.serial('NC - Logged out existing user', () => {
  const testUser = UserUtils.createTestUser('National correspondent')
  let invitationPath: string

  test('Admin invites NC', async ({ authenticatedPage }) => {
    invitationPath = await adminInviteNc(authenticatedPage, testUser)
  })

  test('NC creates account without accepting', async ({ browser }) => {
    const ncContext = await browser.newContext({ baseURL: test.info().project.use.baseURL })
    const ncPage = await ncContext.newPage()

    await ncPage.goto(invitationPath)
    await ncPage.fill('input[name="password"]', testUser.password)
    await ncPage.fill('input[name="password2"]', testUser.password)
    await ncPage.click('button.button:has-text("Sign in with FRA")')
    // Wait for the accept page — confirms registration succeeded — then close without accepting
    await ncPage.waitForSelector('[id="select-user.props.title"]', { timeout: 30_000 })
    await ncContext.close()
  })

  test('NC logs in and accepts invitation', async ({ browser }) => {
    const ncContext = await browser.newContext({ baseURL: test.info().project.use.baseURL })
    const ncPage = await ncContext.newPage()

    await ncPage.goto(invitationPath)
    // Email is pre-filled and disabled — existing user sees only the password field
    await ncPage.fill('input[name="password"]', testUser.password)
    await ncPage.click('button.button:has-text("Sign in with FRA")')

    await fillAcceptForm(ncPage)
    await ncPage.getByRole('button', { name: 'Accept Invitation' }).click()
    await expect(ncPage).toHaveURL(/\/assessments\/fra\/2025\/X01\/home\/overview$/)
    await ncContext.close()
  })

  test('Admin confirms no pending badge', async ({ authenticatedPage }) => {
    await adminConfirmsNoPending(authenticatedPage, testUser.fullName)
  })
})

test.describe.serial('NC - Logged in existing user', () => {
  const testUser = UserUtils.createTestUser('National correspondent')
  let invitationPath: string

  test('Admin invites NC', async ({ authenticatedPage }) => {
    invitationPath = await adminInviteNc(authenticatedPage, testUser)
  })

  test('NC accepts invitation while already logged in', async ({ browser }) => {
    const ncContext = await browser.newContext({ baseURL: test.info().project.use.baseURL })
    const ncPage = await ncContext.newPage()

    // Register via API — creates account and sets JWT cookie (user is now logged in)
    const invitationUuid = new URL(invitationPath, 'http://a').searchParams.get('invitationUuid')
    const registerResponse = await ncPage.request.post('/auth/login', {
      multipart: { email: testUser.email, password: testUser.password, password2: testUser.password, invitationUuid },
    })
    expect(registerResponse.ok()).toBeTruthy()

    // Already logged in — Login page redirects straight to the accept form
    await ncPage.goto(invitationPath)
    await fillAcceptForm(ncPage)
    await ncPage.getByRole('button', { name: 'Accept Invitation' }).click()
    await expect(ncPage).toHaveURL(/\/assessments\/fra\/2025\/X01\/home\/overview$/)
    await ncContext.close()
  })

  test('Admin confirms no pending badge', async ({ authenticatedPage }) => {
    await adminConfirmsNoPending(authenticatedPage, testUser.fullName)
  })
})

test.describe.serial('NC - Logged in as different user', () => {
  const testUser = UserUtils.createTestUser('National correspondent')
  let invitationPath: string

  test('Admin invites NC', async ({ authenticatedPage }) => {
    invitationPath = await adminInviteNc(authenticatedPage, testUser)
  })

  test('Admin visits NC invitation link (wrong user) and sees notification', async ({ authenticatedPage }) => {
    // Admin is already logged in as a different user
    await authenticatedPage.goto(invitationPath)

    // Should NOT land on the invitation accept form
    await expect(authenticatedPage).not.toHaveURL(/\/login\/invitation\//)
    // Should show a notification explaining the mismatch
    await expect(authenticatedPage.getByText(/linked to a different user/i)).toBeVisible()
  })
})
