import { expect, test } from '@playwright/test'

import { testCredentials } from 'test/e2e/config/credentials'
import { AuthUtils } from 'test/e2e/utils/Auth'

test.describe('Login - success', () => {
  test('should login with test user credentials', async ({ page }) => {
    await page.goto(`/assessments/${testCredentials.assessmentName}/${testCredentials.cycleName}/login`)

    await page.fill('input[name="email"]', testCredentials.email)
    await AuthUtils.fillLoginForm(page, testCredentials.password)

    await expect(page).toHaveURL(`/assessments/${testCredentials.assessmentName}/${testCredentials.cycleName}`)
    await expect(page.getByText('Test User')).toBeVisible()
  })
})
