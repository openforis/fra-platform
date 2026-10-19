import { enTranslation } from 'i18n/resources/en'

import { ODPNationalClassFactory } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'

import { MessageCenterApi } from 'test/e2e/api/messageCenter'
import { Timeouts } from 'test/e2e/config/timeouts'
import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { MessageCenterUtils } from 'test/e2e/utils/messageCenter'
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

test.describe('Message center: review comments - NDP national class', () => {
  test.use({ ndpSeeds: [{ countryIso, nationalClasses: [nationalClass], year: seededYear }] })

  test('Admin adds a comment to a national class and still sees it after reloading the page', async ({
    authenticatedPage,
    ndp,
  }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    const reviewButton = NDPDomUtils.getNationalClassReviewButton(page)
    const topic = MessageCenterUtils.getTopic(page)
    const message = topic.locator('.message')

    await test.step('Admin adds a comment to a national class and sees it in the comments', async () => {
      await page.goto(ndpPath)
      await DOMUtils.ensureEditingUnlocked(page)

      await expect(reviewButton).not.toHaveClass(/\bopen\b/)
      await reviewButton.click()

      await expect(topic.locator('.topic-title')).toContainText(nationalClass.name)
      await expect(topic).toContainText(enTranslation.review.noComments)

      await MessageCenterUtils.addComment(page, comment)

      await expect(message).toContainText(comment, { timeout: Timeouts.medium })
      await expect(topic).not.toContainText(enTranslation.review.noComments)
      await expect(reviewButton).toHaveClass(/\bopen\b/, { timeout: Timeouts.medium })
    })

    await test.step('Admin reloads the page and sees the comment', async () => {
      await page.reload()
      await DOMUtils.ensureEditingUnlocked(page)

      const topicLoaded = MessageCenterApi.waitForTopic(page)
      await reviewButton.click()
      const storedTopic = await topicLoaded
      expect(storedTopic.messages.map<string>((m) => m.message)).toEqual([comment])

      await expect(message).toContainText(comment)
      await expect(reviewButton).toHaveClass(/\bopen\b/)
    })
  })

  test('Admin deletes their comment and still sees it marked as deleted after reloading the page', async ({
    authenticatedPage,
    ndp,
  }) => {
    const page = authenticatedPage

    const reviewButton = NDPDomUtils.getNationalClassReviewButton(page)
    const message = MessageCenterUtils.getTopic(page).locator('.message')

    await test.step('Admin deletes their comment and sees it marked as deleted', async () => {
      const topicLocation = MessageCenterUtils.getNationalClassTopicLocation({ nationalClass, ndp, sectionName })
      await MessageCenterApi.addMessage(page, topicLocation, comment)

      await page.goto(ndpPath)
      await DOMUtils.ensureEditingUnlocked(page)
      await reviewButton.click()

      await expect(message).toContainText(comment)

      await MessageCenterUtils.deleteComment(page)

      await expect(message).toHaveClass(/\bdeleted\b/, { timeout: Timeouts.medium })
      await expect(message).toContainText(enTranslation.review.commentDeleted)
      await expect(message).not.toContainText(comment)
      await expect(message.locator('.btn-remove-msg')).toHaveCount(0)
    })

    await test.step('Admin reloads the page and sees the comment still marked as deleted', async () => {
      await page.reload()
      await DOMUtils.ensureEditingUnlocked(page)

      const topicLoaded = MessageCenterApi.waitForTopic(page)
      await reviewButton.click()
      const storedTopic = await topicLoaded
      expect(storedTopic.messages.map<boolean>((m) => m.deleted)).toEqual([true])

      await expect(message).toHaveClass(/\bdeleted\b/)
      await expect(message).toContainText(enTranslation.review.commentDeleted)
    })
  })
})
