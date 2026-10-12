import { type Locator, type Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ODPNationalClassFactory, type OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'
import { MessageTopicType } from 'meta/messageCenter/messageTopic'
import { Topics } from 'meta/messageCenter/topics'

import { MessageCenterApi, type TopicLocation } from 'test/e2e/api/messageCenter'
import { Timeouts } from 'test/e2e/config/timeouts'
import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'

// Every X country is taken, so the message center specs use BGR
const countryIso = 'BGR'
const sectionName = SectionNames.extentOfForest
// Each message center spec uses its own NDP year
const seededYear = 2015
const ndpPath = SectionUtils.ndpPath({ countryIso, sectionName, year: seededYear })

const nationalClass = ODPNationalClassFactory.newNationalClass({ name: 'Forest' })
const comment = 'Please check the area of this class'

const getTopic = (page: Page): Locator => page.locator('.topic')

const getTopicLocation = (ndp: OriginalDataPoint): TopicLocation => ({
  countryIso,
  key: Topics.getOdpClassReviewTopicKey(ndp.id, nationalClass.uuid, 'definition'),
  sectionName,
  type: MessageTopicType.review,
})

const addComment = async (page: Page, text: string): Promise<void> => {
  const topic = getTopic(page)

  const posted = DOMUtils.waitForResponse(page, ApiEndPoint.MessageCenter.topicMessage(), 'POST')
  await topic.getByPlaceholder(enTranslation.review.writeComment, { exact: true }).fill(text)
  await topic.getByRole('button', { name: enTranslation.common.add, exact: true }).click()
  await posted
}

const deleteComment = async (page: Page): Promise<void> => {
  const deleted = DOMUtils.waitForResponse(page, ApiEndPoint.MessageCenter.topicMessage(), 'DELETE')
  await getTopic(page).locator('.message .btn-remove-msg').click()
  await deleted
}

test.describe('Message center: review comments - NDP national class', () => {
  test.use({ ndpSeeds: [{ countryIso, nationalClasses: [nationalClass], year: seededYear }] })

  test('Admin adds a comment to a national class and sees it in the comments', async ({ authenticatedPage, ndp }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(ndpPath)
    await DOMUtils.ensureEditingUnlocked(page)

    const reviewButton = NDPDomUtils.getNationalClassReviewButton(page)
    await expect(reviewButton).not.toHaveClass(/\bopen\b/)
    await reviewButton.click()

    const topic = getTopic(page)
    await expect(topic.locator('.topic-title')).toContainText(nationalClass.name)
    await expect(topic).toContainText(enTranslation.review.noComments)

    await addComment(page, comment)

    const message = topic.locator('.message')
    await expect(message).toContainText(comment, { timeout: Timeouts.medium })
    await expect(topic).not.toContainText(enTranslation.review.noComments)
    await expect(reviewButton).toHaveClass(/\bopen\b/, { timeout: Timeouts.medium })
  })

  test('Admin reloads the page and sees the comment', async ({ authenticatedPage, ndp }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(ndpPath)
    await DOMUtils.ensureEditingUnlocked(page)

    const reviewButton = NDPDomUtils.getNationalClassReviewButton(page)
    await reviewButton.click()
    await expect(getTopic(page)).toContainText(enTranslation.review.noComments)
    await addComment(page, comment)

    await page.reload()
    await DOMUtils.ensureEditingUnlocked(page)

    const topicLoaded = MessageCenterApi.waitForTopic(page)
    await reviewButton.click()
    const storedTopic = await topicLoaded
    expect(storedTopic.messages.map<string>((m) => m.message)).toEqual([comment])

    await expect(getTopic(page).locator('.message')).toContainText(comment)
    await expect(reviewButton).toHaveClass(/\bopen\b/)
  })

  test('Admin deletes their comment and sees it marked as deleted', async ({ authenticatedPage, ndp }) => {
    const page = authenticatedPage
    await MessageCenterApi.addMessage(page, getTopicLocation(ndp), comment)

    await page.goto(ndpPath)
    await DOMUtils.ensureEditingUnlocked(page)
    await NDPDomUtils.getNationalClassReviewButton(page).click()

    const message = getTopic(page).locator('.message')
    await expect(message).toContainText(comment)

    await deleteComment(page)

    await expect(message).toHaveClass(/\bdeleted\b/, { timeout: Timeouts.medium })
    await expect(message).toContainText(enTranslation.review.commentDeleted)
    await expect(message).not.toContainText(comment)
    await expect(message.locator('.btn-remove-msg')).toHaveCount(0)
  })

  test('Admin reloads the page and sees the comment still marked as deleted', async ({ authenticatedPage, ndp }) => {
    const page = authenticatedPage
    await MessageCenterApi.addMessage(page, getTopicLocation(ndp), comment)

    await page.goto(ndpPath)
    await DOMUtils.ensureEditingUnlocked(page)

    const reviewButton = NDPDomUtils.getNationalClassReviewButton(page)
    await reviewButton.click()
    await deleteComment(page)

    await page.reload()
    await DOMUtils.ensureEditingUnlocked(page)

    const topicLoaded = MessageCenterApi.waitForTopic(page)
    await reviewButton.click()
    const storedTopic = await topicLoaded
    expect(storedTopic.messages.map<boolean>((m) => m.deleted)).toEqual([true])

    const message = getTopic(page).locator('.message')
    await expect(message).toHaveClass(/\bdeleted\b/)
    await expect(message).toContainText(enTranslation.review.commentDeleted)
  })
})
