import { expect, test } from '../fixtures/auth'
import { AuthUtils } from '../utils/Auth'
import { DOMUtils } from '../utils/DOM'
import { MailUtil } from '../utils/Mail'
import { UserUtils } from '../utils/User'

test.describe.serial('National Correspondent: ', () => {
  const testUser = UserUtils.createTestUser('National correspondent')
  let invitationPath: string

  test('Admin invites a national correspondent', async ({ authenticatedPage }) => {
    const page = authenticatedPage
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

    // Note: It's possible to get the URL from the platform
    // We want to verify email work as well
    invitationPath = await MailUtil.getInvitationLink(email)
  })

  test('NC accepts invitation', async ({ browser }) => {
    // new clean browser state
    const ncContext = await browser.newContext({ baseURL: test.info().project.use.baseURL })
    const ncPage = await ncContext.newPage()

    await ncPage.goto(invitationPath)
    await ncPage.fill('input[name="password"]', testUser.password)
    await ncPage.fill('input[name="password2"]', testUser.password)
    await ncPage.click('button.button:has-text("Accept Invitation with FRA")')

    await expect(ncPage).not.toHaveURL(/\/login\/invitation\//)
    await ncContext.close()
  })

  test('NC fills required info on first login', async ({ browser }) => {
    const ncContext = await browser.newContext({ baseURL: test.info().project.use.baseURL })
    const ncPage = await ncContext.newPage()

    await AuthUtils.login(ncPage, { email: testUser.email, password: testUser.password })

    // Navigate to country page -> should trigger redirect to profile
    await ncPage.goto('/assessments/fra/2025/X01/home')
    await ncPage.waitForURL(/\/users\//)

    // Check the notification shows correct text
    await expect(ncPage.getByText('Please complete your personal information before continuing')).toBeVisible()

    // == Fill form
    await DOMUtils.selectOption(ncPage, { id: 'select-user.props.title' }, 'Mr.')

    // Role properties
    await DOMUtils.fillWYSIWYG(ncPage, { id: 'role.props.organization' }, 'Test Organization')
    await DOMUtils.fillInput(ncPage, { id: 'role.props.address.street' }, 'Test Street 1')
    await DOMUtils.fillInput(ncPage, { id: 'role.props.address.zipCode' }, '00100')
    await DOMUtils.fillInput(ncPage, { id: 'role.props.address.city' }, 'Helsinki')
    await DOMUtils.nestedSelectOption(ncPage, { id: 'select-role.props.address.countryIso' }, 'Finland')
    await DOMUtils.fillInput(ncPage, { id: 'role.props.primaryPhoneNumber-phone-number' }, '123456789')
    await DOMUtils.selectOption(ncPage, { id: 'select-role.props.contactPreference.method' }, 'Primary email address')

    await ncPage.getByRole('button', { name: 'Submit' }).click()

    // After submitting, NC is redirected back to country page
    await expect(ncPage).toHaveURL(/\/assessments\/fra\/2025\/X01\/home\/overview$/)
    await ncContext.close()
  })

  test('admin sees NC is no longer pending', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto('/assessments/fra/2025/X01/home/collaborators')
    const userCard = page.locator('.home-user-card', { hasText: testUser.fullName })
    await expect(userCard).toBeVisible()
    await DOMUtils.elementNotExists(userCard.locator('.invitation-badge'))
  })
})
