import { expect, test } from '@playwright/test'

import { testCredentials } from 'test/e2e/config/credentials'
import { AuthUtils } from 'test/e2e/utils/Auth'

test.describe('Login - failure', () => {
  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto(`/assessments/${testCredentials.assessmentName}/${testCredentials.cycleName}/login`)

    await page.fill('input[name="email"]', 'wrong@email.com')
    await AuthUtils.fillLoginForm(page, 'wrongpassword')

    await expect(page.getByText("We couldn't find any user matching these credentials.")).toBeVisible()
    await expect(
      page.getByText('Make sure you have a valid FRA account or try another authentication method.')
    ).toBeVisible()
  })
})
