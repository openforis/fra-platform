import { expect, test } from '../fixtures/auth'
import { DOMUtils } from '../utils/DOM'
import { UserUtils } from '../utils/User'

test.describe('Invite National Correspondent', () => {
  test('admin can invite a national correspondent', async ({ authenticatedPage }) => {
    const page = authenticatedPage
    const { email, fullName, name, role, surname } = UserUtils.createTestUser('National correspondent')

    // Navigate to test country's collaborators page
    await page.goto('/assessments/fra/2025/X01/home/collaborators')

    // Click Add collaborator
    await page.getByRole('link', { name: 'Add collaborator' }).click()

    // Fill the form
    await page.fill('input[name="name"]', name)
    await page.fill('input[name="surname"]', surname)
    await page.fill('input[name="email"]', email)

    // Select role
    await DOMUtils.selectOption(page, '#select-role', role)

    // Submit
    await page.getByRole('button', { name: 'Submit' }).click()

    // Verify user appears with Pending badge
    const userCard = page.locator('.home-user-card', { hasText: fullName })
    await expect(userCard).toBeVisible()
    await expect(userCard.locator('.invitation-badge')).toHaveText('Pending')
  })
})
