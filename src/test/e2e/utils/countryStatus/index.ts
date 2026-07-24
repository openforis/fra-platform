import { expect, Page } from '@playwright/test'

import { DOMUtils } from '../dom'

const sendToReviewLabel = 'Send to review'
const submitToReviewWarning = 'There are errors in the data, are you sure you want to submit the report to review?'

const expectSubmitToReviewWarning = async (page: Page): Promise<void> => {
  const status = page.locator('.nav-header__status.actionable-true')
  await DOMUtils.ensureEditingUnlocked(page)
  await expect(status).toBeVisible({ timeout: 10000 })
  await status.click()
  await page.getByText(sendToReviewLabel).click()
  await expect(page.locator('.modal')).toBeVisible()
  await expect(page.getByText(submitToReviewWarning)).toBeVisible()
  await page.getByRole('button', { name: 'Cancel' }).click()
}

export const CountryStatusUtils = {
  expectSubmitToReviewWarning,
}
