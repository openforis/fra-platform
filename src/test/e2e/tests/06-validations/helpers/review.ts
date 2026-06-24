import { expect, type Page } from '@playwright/test'
import other from 'i18n/resources/en/other.json'

import { DOMUtils } from 'test/e2e/utils/dom'

const sendToReviewLabel = other.assessment.status.review.next
const submitToReviewWarning = other.navigation.submitToReviewWithErrorsWarning

type ExpectSubmitToReviewWarningProps = {
  present: boolean
}

// Opens the "send to review" modal, checks that the error is shown and cancels
export const expectSubmitToReviewWarning = async (
  page: Page,
  props: ExpectSubmitToReviewWarningProps
): Promise<void> => {
  const { present } = props
  const status = page.locator('.nav-header__status.actionable-true')

  await DOMUtils.unlockEditing(page)
  await expect(status).toBeVisible({ timeout: 10000 })
  await status.click()
  await page.getByText(sendToReviewLabel).click()
  await expect(page.locator('.modal')).toBeVisible()

  const warning = page.getByText(submitToReviewWarning)
  if (present) {
    await expect(warning).toBeVisible()
  } else {
    await expect(warning).toHaveCount(0)
  }

  await page.getByRole('button', { name: 'Cancel' }).click()
}
