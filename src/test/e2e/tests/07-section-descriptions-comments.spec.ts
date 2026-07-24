import { Locator, Page } from '@playwright/test'

import { expect, test } from '../fixtures/auth'
import { DescriptionUtils } from '../utils/description'
import { DOMUtils } from '../utils/dom'
import { LinkFixtures } from '../utils/links'
import { TextFixtures } from '../utils/text'
import { TooltipUtils } from '../utils/tooltip'
import { commentsSectionPath } from './07-section-descriptions.fixture'

const commentsTitle = 'Comments'
const randomString = Date.now().toString()

const commentsEditor = (page: Page): Locator => DescriptionUtils.getDescriptionEditor(page, commentsTitle)
const commentsValidationError = (page: Page): Locator =>
  DescriptionUtils.getDescriptionValidationError(page, commentsTitle)
const commentsToggleEditButton = (page: Page, name: 'Done' | 'Edit'): Locator =>
  DescriptionUtils.getDescriptionToggleEditButton(page, commentsTitle, name)

test.describe.serial('Section descriptions: comments', () => {
  const commentLines = TextFixtures.multiLine(randomString)

  test('NC edits the comments', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(commentsSectionPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await DescriptionUtils.save(page, async () => {
      await commentsToggleEditButton(page, 'Edit').click()
      await DescriptionUtils.fillEditorWysiwyg(page, commentsEditor(page), commentLines)
      await commentsToggleEditButton(page, 'Done').click()
    })

    await expect(commentsEditor(page)).toContainText(randomString)
    await page.reload()
    await expect(commentsEditor(page)).toContainText(randomString)
  })
})

test.describe.serial('Section descriptions: comments - invalid links', () => {
  const commentsInvalidLinks = LinkFixtures.buildInvalidLinksHtml(`comments-${randomString}`)

  test('NC enters an empty link and a broken link, sees both validation errors', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(commentsSectionPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await DescriptionUtils.save(page, async () => {
      await commentsToggleEditButton(page, 'Edit').click()
      await DescriptionUtils.pasteIntoEditorWysiwyg(page, commentsEditor(page), commentsInvalidLinks.html)
      await commentsToggleEditButton(page, 'Done').click()
    })

    await expect(commentsValidationError(page)).toBeVisible({ timeout: 20000 })
    await TooltipUtils.expectValidationTooltip(
      page,
      commentsValidationError(page),
      `Invalid link: "${commentsInvalidLinks.emptyLinkText}" (Empty)`
    )
    await TooltipUtils.expectValidationTooltip(
      page,
      commentsValidationError(page),
      `Invalid link: "${commentsInvalidLinks.brokenLinkDisplayUrl}" (DNS error)`
    )
  })
})
