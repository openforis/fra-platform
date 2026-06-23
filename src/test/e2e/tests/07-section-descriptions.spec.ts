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

const randomString = `${Date.now()}${Math.floor(Math.random() * 100_000)}`
const commentLines = [
  'These are valid comments.',
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${randomString}`,
]

const commentsBlock = (page: Page): Locator =>
  page
    .locator('.description-title', { hasText: 'Comments' })
    .first()
    .locator('xpath=ancestor::*[contains(@class, "data-grid") and contains(@class, "description")][1]')
const commentsEditor = (page: Page): Locator => commentsBlock(page).locator('.jodit-wysiwyg')
const commentsToggleEditButton = (page: Page, name: 'Done' | 'Edit'): Locator =>
  commentsBlock(page).locator('button:visible', { hasText: name })

test.describe.serial('Section descriptions: comments', () => {
  test('NC edits the comments', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(sectionPath)
    await DOMUtils.unlockEditing(page)

    // Listener for onBlur save for description comments
    const descriptionSaved = page.waitForResponse(
      (response) => response.url().includes('/api/cycle-data/descriptions') && response.request().method() === 'PUT'
    )

    await commentsToggleEditButton(page, 'Edit').click()
    await DOMUtils.fillEditorWysiwyg(page, commentsEditor(page), commentLines)
    await commentsToggleEditButton(page, 'Done').click()

    // Wait for the above listener completed
    await descriptionSaved

    await expect(commentsEditor(page)).toContainText(randomString)
    await page.reload()
    await expect(commentsEditor(page)).toContainText(randomString)
  })
})
