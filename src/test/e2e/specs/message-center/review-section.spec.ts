import { enTranslation } from 'i18n/resources/en'

import { SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'

import { expect, test } from 'test/e2e/fixtures/auth'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'
import { MessageCenterUtils } from 'test/e2e/utils/messageCenter'
import { SectionUtils } from 'test/e2e/utils/section'
import { TableDomUtils } from 'test/e2e/utils/table'

// Every X country is taken, so the message center specs use BGR
const countryIso = 'BGR'
const sectionPath = SectionUtils.path({ countryIso, sectionName: SectionNames.growingStock })

const tableName = TableNames.growingStockAvg
const variableName = 'forest'
const rowTitle = enTranslation.fra.growingStock.totalForest
const descriptionTitle = enTranslation.description.nationalClassificationAndDefinitions

// Nothing removes these topics, so the tests never post and the comments stay empty
test.describe('Message center: review comments - section page', () => {
  test('Admin opens the comments of a table row and sees the row name in the title', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(sectionPath)
    await DOMUtils.ensureEditingUnlocked(page)
    await TableDomUtils.getRowReviewButton(page, tableName, variableName).click()

    const topic = MessageCenterUtils.getTopic(page)
    await expect(topic.locator('.topic-title')).toHaveText(rowTitle)
    // The title shows before the comments load, so also wait for them
    await expect(topic).toContainText(enTranslation.review.noComments)
  })

  test('Admin opens the comments of a description and sees the description title', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(sectionPath)
    await DOMUtils.ensureEditingUnlocked(page)
    await DescriptionUtils.getDescriptionBlock(page, descriptionTitle).locator('button.review-indicator').click()

    const topic = MessageCenterUtils.getTopic(page)
    await expect(topic.locator('.topic-title')).toHaveText(descriptionTitle)
    // The title shows before the comments load, so also wait for them
    await expect(topic).toContainText(enTranslation.review.noComments)
  })

  test('Admin locks editing and sees the comments close', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(sectionPath)
    await DOMUtils.ensureEditingUnlocked(page)

    const reviewButton = TableDomUtils.getRowReviewButton(page, tableName, variableName)
    await reviewButton.click()
    const topic = MessageCenterUtils.getTopic(page)
    // Lock once the comments load, so the lock closes a loaded panel
    await expect(topic).toContainText(enTranslation.review.noComments)

    const lockButton = page.locator('.btn-lock')
    await lockButton.click()

    await expect(lockButton).toHaveClass(/\blocked\b/)
    await expect(topic).toHaveCount(0)
    await expect(reviewButton).toHaveCount(0)
  })
})
