import { Locator, Page } from '@playwright/test'

import { commentsSectionPath } from 'test/e2e/data/sectionDescriptions'
import { expect, test } from 'test/e2e/fixtures/auth'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'
import { LinkBuilder } from 'test/e2e/utils/links'
import { TooltipUtils } from 'test/e2e/utils/tooltip'

const commentsTitle = 'Comments'
const randomString = Date.now().toString()

const commentsEditor = (page: Page): Locator => DescriptionUtils.getDescriptionEditor(page, commentsTitle)
const commentsValidationError = (page: Page): Locator =>
  DescriptionUtils.getDescriptionValidationError(page, commentsTitle)
const commentsToggleEditButton = (page: Page, name: 'Done' | 'Edit'): Locator =>
  DescriptionUtils.getDescriptionToggleEditButton(page, commentsTitle, name)

test.describe.serial('Section descriptions: comments - failure', () => {
  const commentsInvalidLinks = LinkBuilder.buildInvalidLinksHtml(`comments-${randomString}`)

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
