import { expect, Locator, Page, Route } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { ApiEndPoint } from 'meta/api/endpoint'

import { DOMUtils } from '../dom'

const sendToReviewLabel = enTranslation.assessment.status.review.next
const submitToReviewWarning = enTranslation.navigation.submitToReviewWithErrorsWarning
const notifySelfLabel = enTranslation.navigation.notifySelf
const submitLabel = enTranslation.common.submit
const cancelLabel = enTranslation.common.cancel

const _openSendToReview = async (page: Page): Promise<Locator> => {
  const status = page.locator('.nav-header__status.actionable-true')
  await DOMUtils.ensureEditingUnlocked(page)
  await expect(status).toBeVisible({ timeout: 10_000 })
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

// The modal can hide recipients, so setting notify to false in the request
const _notificationsOff = async (route: Route): Promise<void> => {
  const url = new URL(route.request().url())
  url.searchParams.set('notifyUsers', 'false')
  url.searchParams.set('notifySelf', 'false')
  await route.continue({ url: url.toString() })
}

const _isCountryUpdate = (url: URL): boolean => url.pathname === ApiEndPoint.Area.country()

// Sends to review without notifying anyone
const sendToReview = async (page: Page): Promise<void> => {
  const modal = await _openSendToReview(page)
  await modal.getByRole('button', { name: notifySelfLabel, exact: true }).click()

  await page.route(_isCountryUpdate, _notificationsOff)
  const countrySaved = DOMUtils.waitForResponse(page, ApiEndPoint.Area.country(), 'PATCH')
  await modal.getByRole('button', { name: submitLabel, exact: true }).click()
  await countrySaved
  await page.unroute(_isCountryUpdate, _notificationsOff)

  await expect(modal).toHaveCount(0)
}

export const CountryStatusUtils = {
  sendToReview,
  sendToReviewHasWarning,
}
