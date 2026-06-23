import { Locator, Page } from '@playwright/test'

import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'

import { expect, test } from '../fixtures/auth'
import { DOMUtils } from '../utils/DOM'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const countryIso = 'X01'
const sectionName = 'specificForestCategories'
const sectionPath = `/assessments/${assessmentName}/${cycleName}/${countryIso}/sections/${sectionName}`

const commentsTitle = 'Comments'

const randomString = Date.now().toString()
const commentLines = [
  'These are valid comments.',
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${randomString}`,
]

const emptyLinkText = 'empty link'
const brokenLinkDomain = 'this-domain-does-not-exist-e2e-test.invalid'
const brokenLinkUrl = `https://${brokenLinkDomain}`
const invalidLinksHtml = `<a href="">${emptyLinkText}</a><br><a href="${brokenLinkUrl}">broken link</a>`
const brokenLinkDisplayUrl = `//${brokenLinkDomain}`

const commentsEditor = (page: Page): Locator => DOMUtils.descriptionEditor(page, commentsTitle)
const commentsValidationError = (page: Page): Locator => DOMUtils.descriptionValidationError(page, commentsTitle)
const commentsToggleEditButton = (page: Page, name: 'Done' | 'Edit'): Locator =>
  DOMUtils.descriptionToggleEditButton(page, commentsTitle, name)

test.describe.serial('Section descriptions: comments', () => {
  test('NC edits the comments', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(sectionPath)
    await DOMUtils.unlockEditing(page)

    const descriptionSaved = DOMUtils.waitForApiSave(page, '/api/cycle-data/descriptions')

    await commentsToggleEditButton(page, 'Edit').click()
    await DOMUtils.fillEditorWysiwyg(page, commentsEditor(page), commentLines)
    await commentsToggleEditButton(page, 'Done').click()

    await descriptionSaved

    await expect(commentsEditor(page)).toContainText(randomString)
    await page.reload()
    await expect(commentsEditor(page)).toContainText(randomString)
  })

  test('NC enters an empty link and a broken link, sees both validation errors', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(sectionPath)
    await DOMUtils.unlockEditing(page)

    const descriptionSaved = DOMUtils.waitForApiSave(page, '/api/cycle-data/descriptions')

    await commentsToggleEditButton(page, 'Edit').click()
    await DOMUtils.pasteIntoEditorWysiwyg(page, commentsEditor(page), invalidLinksHtml)
    await commentsToggleEditButton(page, 'Done').click()

    await descriptionSaved

    await expect(commentsValidationError(page)).toBeVisible({ timeout: 20000 })
    await DOMUtils.expectValidationTooltip(
      page,
      commentsValidationError(page),
      `Invalid link: "${emptyLinkText}" (Empty)`
    )
    await DOMUtils.expectValidationTooltip(
      page,
      commentsValidationError(page),
      `Invalid link: "${brokenLinkDisplayUrl}" (DNS error)`
    )
  })
})
