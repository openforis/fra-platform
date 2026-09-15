import { Numbers } from 'utils/numbers'

import { TableDomUtils } from 'test/e2e/utils/table'

import { expect, test } from '../fixtures/auth'
import { AuthUtils } from '../utils/Auth'
import { DOMUtils } from '../utils/dom'
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

  test('NC accepts invitation and fills required info', async ({ browser }) => {
    // new clean browser state
    const ncContext = await browser.newContext({ baseURL: test.info().project.use.baseURL })
    const ncPage = await ncContext.newPage()

    await ncPage.goto(invitationPath)
    await ncPage.fill('input[name="password"]', testUser.password)
    await ncPage.fill('input[name="password2"]', testUser.password)
    await ncPage.click('button.button:has-text("Sign in with FRA")')

    // After registering, wait for the accept-invitation page to load with the required info form
    await ncPage.waitForSelector('[id="select-user.props.title"]', { timeout: 30_000 })

    await DOMUtils.selectOption(ncPage, { id: 'select-user.props.title' }, 'Mr.')
    await DOMUtils.fillWYSIWYG(ncPage, { id: 'role.props.organization' }, 'Test Organization')
    await DOMUtils.fillInput(ncPage, { id: 'role.props.address.street' }, 'Test Street 1')
    await DOMUtils.fillInput(ncPage, { id: 'role.props.address.zipCode' }, '00100')
    await DOMUtils.fillInput(ncPage, { id: 'role.props.address.city' }, 'Helsinki')
    await DOMUtils.nestedSelectOption(ncPage, { id: 'select-role.props.address.countryIso' }, 'Finland')
    await DOMUtils.fillInput(ncPage, { id: 'role.props.primaryPhoneNumber-phone-number' }, '123456789')
    await DOMUtils.selectOption(ncPage, { id: 'select-role.props.contactPreference.method' }, 'Primary email address')

    await ncPage.getByRole('button', { name: 'Accept Invitation' }).click()

    // After submitting, NC is redirected to country home
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

  test('NC edits cell in table 1a with correct and incorrect values', async ({ browser }) => {
    const ncContext = await browser.newContext({
      baseURL: test.info().project.use.baseURL,
    })
    const ncPage = await ncContext.newPage()
    await AuthUtils.login(ncPage, { email: testUser.email, password: testUser.password })

    // Navigate using sidebar and unlock editing
    await ncPage.goto('/assessments/fra/2025/X01/home')
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
})
