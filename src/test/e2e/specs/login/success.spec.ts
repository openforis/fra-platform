import { expect, test } from '@playwright/test'

import { ApiEndPoint } from 'meta/api/endpoint'
import { type Assessment } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'

import { testCredentials } from 'test/e2e/config/credentials'
import { AuthUtils } from 'test/e2e/utils/Auth'

test.describe('Login - success', () => {
  test('should login with test user credentials', async ({ page }) => {
    // The test user is an admin, and admins land on the last created cycle
    const response = await page.request.get(ApiEndPoint.init())
    const { assessments }: { assessments: Array<Assessment> } = await response.json()
    const assessment = assessments.find((a) => a.props.name === testCredentials.assessmentName)
    const { name: lastCreatedCycleName } = Assessments.getLastCreatedCycle(assessment)

    await page.goto(`/assessments/${testCredentials.assessmentName}/${testCredentials.cycleName}/login`)

    await page.fill('input[name="email"]', testCredentials.email)
    await AuthUtils.fillLoginForm(page, testCredentials.password)

    await expect(page).toHaveURL(`/assessments/${testCredentials.assessmentName}/${lastCreatedCycleName}`)
    await expect(page.getByText('Test User')).toBeVisible()
  })
})
