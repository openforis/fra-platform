import { expect, Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { DOMUtils } from '../dom'

const sendToReviewLabel = enTranslation.assessment.status.review.next
const submitToReviewWarning = enTranslation.navigation.submitToReviewWithErrorsWarning
const submitLabel = enTranslation.common.submit
const cancelLabel = enTranslation.common.cancel

// Opens the send to review modal, checks the errors warning and closes it without submitting, so no emails go out
const submitToReviewHasWarning = async (page: Page, hasWarning: boolean): Promise<void> => {
  const status = page.locator('.nav-header__status.actionable-true')
  await DOMUtils.ensureEditingUnlocked(page)
  await expect(status).toBeVisible({ timeout: 10_000 })
  await status.click()
  await page.getByText(sendToReviewLabel, { exact: true }).click()

  const modal = page.locator('.modal')
  // Submit only shows once the modal has loaded, so wait for it before checking the warning
  await expect(modal.getByRole('button', { name: submitLabel, exact: true })).toBeVisible()

  const warning = modal.getByText(submitToReviewWarning)
  if (hasWarning) {
    await expect(warning).toBeVisible()
  } else {
    await expect(warning).toHaveCount(0)
  }

  await modal.getByRole('button', { name: cancelLabel, exact: true }).click()
  await expect(modal).toHaveCount(0)
}

export const CountryStatusUtils = {
  submitToReviewHasWarning,
}
