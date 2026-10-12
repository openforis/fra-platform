import { expect, Locator, Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { ApiEndPoint } from 'meta/api/endpoint'

import { Timeouts } from 'test/e2e/config/timeouts'

import { DOMUtils } from '../dom'

const sendToReviewLabel = enTranslation.assessment.status.review.next
const submitToReviewWarning = enTranslation.navigation.submitToReviewWithErrorsWarning
const messagePlaceholder = enTranslation.navigation.changeStatusTextPlaceholder
const submitLabel = enTranslation.common.submit
const cancelLabel = enTranslation.common.cancel

const _openSendToReview = async (page: Page): Promise<Locator> => {
  const status = page.locator('.nav-header__status.actionable-true')
  await DOMUtils.ensureEditingUnlocked(page)
  await expect(status).toBeVisible({ timeout: Timeouts.medium })
  await status.click()
  await page.getByText(sendToReviewLabel, { exact: true }).click()

  const modal = page.locator('.modal')
  // Submit only shows once the modal has loaded, so wait for it before checking the warning
  await expect(modal.getByRole('button', { name: submitLabel, exact: true })).toBeVisible()
  return modal
}

// Opens the send to review modal, checks the errors warning and closes it without sending
const sendToReviewHasWarning = async (page: Page, hasWarning: boolean): Promise<void> => {
  const modal = await _openSendToReview(page)

  const warning = modal.getByText(submitToReviewWarning)
  if (hasWarning) {
    await expect(warning).toBeVisible()
  } else {
    await expect(warning).toHaveCount(0)
  }

  await modal.getByRole('button', { name: cancelLabel, exact: true }).click()
  await expect(modal).toHaveCount(0)
}

// Sends to review and both admin and reviewers get the email
const sendToReview = async (page: Page, message: string): Promise<void> => {
  const modal = await _openSendToReview(page)
  await modal.getByPlaceholder(messagePlaceholder, { exact: true }).fill(message)

  const countrySaved = DOMUtils.waitForResponse(page, ApiEndPoint.Area.country(), 'PATCH')
  await modal.getByRole('button', { name: submitLabel, exact: true }).click()
  await countrySaved

  await expect(modal).toHaveCount(0)
}

export const CountryStatusUtils = {
  sendToReview,
  sendToReviewHasWarning,
}
