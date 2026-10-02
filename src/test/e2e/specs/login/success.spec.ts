import { expect, test } from '@playwright/test'

import { CycleNames } from 'meta/assessment/cycle/names'

import { testCredentials } from 'test/e2e/config/credentials'
import { AuthUtils } from 'test/e2e/utils/Auth'

test.describe('Login - success', () => {
  test('should login with test user credentials', async ({ page }) => {
    await page.goto(`/assessments/${testCredentials.assessmentName}/${testCredentials.cycleName}/login`)

    await page.fill('input[name="email"]', testCredentials.email)
    await AuthUtils.fillLoginForm(page, testCredentials.password)

    // The test user is an admin, and admins land on the last created cycle
    await expect(page).toHaveURL(`/assessments/${testCredentials.assessmentName}/${CycleNames.latest}`)
    await expect(page.getByText('Test User')).toBeVisible()
  })
})
