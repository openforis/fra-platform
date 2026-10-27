import { Locator, Page } from '@playwright/test'

import { DescriptionsApi } from 'test/e2e/api/descriptions'
import { x12SpecificForestCategories, x12SpecificForestCategoriesPath } from 'test/e2e/data/sectionDescriptions'
import { expect, test } from 'test/e2e/fixtures/auth'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { TextBuilder } from 'test/e2e/utils/text'

const commentsTitle = 'Comments'
const randomString = Date.now().toString()

const commentsEditor = (page: Page): Locator => DescriptionUtils.getDescriptionEditor(page, commentsTitle)
const commentsToggleEditButton = (page: Page, name: 'Done' | 'Edit'): Locator =>
  DescriptionUtils.getDescriptionToggleEditButton(page, commentsTitle, name)

test.describe.serial('Section descriptions: comments - success', () => {
  const commentLines = TextBuilder.multiLine(randomString)

  test.afterAll(async ({ browser }) => {
    await DescriptionsApi.clear(browser, x12SpecificForestCategories)
  })

  test('NC edits the comments', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(x12SpecificForestCategoriesPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await DescriptionUtils.save(page, async () => {
      await commentsToggleEditButton(page, 'Edit').click()
      await DescriptionUtils.fillEditorWysiwyg(page, commentsEditor(page), commentLines)
      await commentsToggleEditButton(page, 'Done').click()
    })

    await expect(commentsEditor(page)).toContainText(randomString)
    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.reload()
    await summaryLoaded
    await expect(commentsEditor(page)).toContainText(randomString)
    await NavigationUtils.subSectionHasError(page, x12SpecificForestCategoriesPath, false)
  })
})
