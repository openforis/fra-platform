import { Locator, Page } from '@playwright/test'

import { DescriptionsApi } from 'test/e2e/api/descriptions'
import { Timeouts } from 'test/e2e/config/timeouts'
import { x12GrowingStock, x12GrowingStockPath } from 'test/e2e/data/sectionDescriptions'
import { expect, test } from 'test/e2e/fixtures/auth'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'

const commentsTitle = 'Comments'
const randomString = Date.now().toString()

const commentsEditor = (page: Page): Locator => DescriptionUtils.getDescriptionEditor(page, commentsTitle)
const commentsToggleEditButton = (page: Page, name: 'Done' | 'Edit'): Locator =>
  DescriptionUtils.getDescriptionToggleEditButton(page, commentsTitle, name)

test.describe('Section descriptions: comments - sync between clients', () => {
  test.afterAll(async ({ browser }) => {
    await DescriptionsApi.clear(browser, x12GrowingStock)
  })

  test('another client viewing the section sees the comments edits', async ({
    authenticatedPage: page,
    otherAuthenticatedPage: otherPage,
  }) => {
    await page.goto(x12GrowingStockPath)
    await DOMUtils.ensureEditingUnlocked(page)
    await otherPage.goto(x12GrowingStockPath)
    await DOMUtils.ensureEditingUnlocked(otherPage)

    await DescriptionUtils.save(page, async () => {
      await commentsToggleEditButton(page, 'Edit').click()
      await DescriptionUtils.fillEditorWysiwyg(page, commentsEditor(page), [randomString])
      await commentsToggleEditButton(page, 'Done').click()
    })

    await expect(commentsEditor(otherPage)).toContainText(randomString, { timeout: Timeouts.medium })

    // ==== the editing client keeps its own edits
    await expect(commentsEditor(page)).toContainText(randomString)
  })
})
