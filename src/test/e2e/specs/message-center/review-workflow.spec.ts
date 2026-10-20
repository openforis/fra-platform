import { mergeTests } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { CountryStatus } from 'meta/area/countryStatus'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { ODPNationalClassFactory } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'
import { MessageTopicStatus } from 'meta/messageCenter/messageTopic'
import { RoleName } from 'meta/user/role/name'

import { MessageCenterApi } from 'test/e2e/api/messageCenter'
import { Timeouts } from 'test/e2e/config/timeouts'
import { test as countryTest } from 'test/e2e/fixtures/country'
import { expect, test as ndpTest } from 'test/e2e/fixtures/ndp'
import { test as userTest } from 'test/e2e/fixtures/user'
import { DOMUtils } from 'test/e2e/utils/dom'
import { MessageCenterUtils } from 'test/e2e/utils/messageCenter'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'

const test = mergeTests(ndpTest, countryTest, userTest)

// This spec changes LUX's status, so no other spec should use it
const countryIso = 'LUX'
const sectionName = SectionNames.extentOfForest
const seededYear = 2015
const ndpPath = SectionUtils.ndpPath({ countryIso, sectionName, year: seededYear })

const nationalClass = ODPNationalClassFactory.newNationalClass({ name: 'Forest' })
const comment = 'Please check the area of this class'
const reply = 'The area is updated'
const resolvedMessage = enTranslation.review.commentMarkedAsResolved

test.describe('Message center: review comments - resolve', () => {
  test.use({
    countrySeed: { countryIso, cycleName: CycleNames._2025, status: CountryStatus.editing },
    ndpSeeds: [{ countryIso, nationalClasses: [nationalClass], year: seededYear }],
  })

  test('Admin resolves the comments and still sees them resolved after reloading the page', async ({
    authenticatedPage,
    country,
    ndp,
  }) => {
    const page = authenticatedPage
    expect(country.props.status).toBe(CountryStatus.editing)

    const reviewButton = NDPDomUtils.getNationalClassReviewButton(page)

    await test.step('Admin resolves the comments and sees them marked as resolved', async () => {
      const topicLocation = MessageCenterUtils.getNationalClassTopicLocation({ nationalClass, ndp, sectionName })
      await MessageCenterApi.addMessage(page, topicLocation, comment)

      await page.goto(ndpPath)
      await DOMUtils.ensureEditingUnlocked(page)

      await expect(reviewButton).toHaveClass(/\bopen\b/)
      await expect(reviewButton).not.toHaveClass(/\bresolved\b/)
      await reviewButton.click()
      await expect(MessageCenterUtils.getMessage(page, comment)).toBeVisible()

      await MessageCenterUtils.resolveComments(page)

      await expect(MessageCenterUtils.getMessage(page, resolvedMessage)).toBeVisible({ timeout: Timeouts.medium })
      await expect(MessageCenterUtils.getResolveButton(page)).toHaveCount(0)
      await expect(reviewButton).toHaveClass(/\bresolved\b/, { timeout: Timeouts.medium })
    })

    await test.step('Admin reloads the page and sees the comments still resolved', async () => {
      await page.reload()
      await DOMUtils.ensureEditingUnlocked(page)

      const topicLoaded = MessageCenterApi.waitForTopic(page)
      await reviewButton.click()
      const storedTopic = await topicLoaded
      expect(storedTopic.status).toBe(MessageTopicStatus.resolved)
      expect(storedTopic.messages.map<string>((m) => m.message)).toEqual([comment, resolvedMessage])

      await expect(MessageCenterUtils.getMessage(page, resolvedMessage)).toBeVisible()
      await expect(MessageCenterUtils.getResolveButton(page)).toHaveCount(0)
      await expect(reviewButton).toHaveClass(/\bresolved\b/)
    })
  })

  test('Admin comments on resolved comments and still sees them reopened after reloading the page', async ({
    authenticatedPage,
    country,
    ndp,
  }) => {
    const page = authenticatedPage
    expect(country.props.status).toBe(CountryStatus.editing)

    const reviewButton = NDPDomUtils.getNationalClassReviewButton(page)

    await test.step('Admin comments on resolved comments and sees them reopened', async () => {
      const topicLocation = MessageCenterUtils.getNationalClassTopicLocation({ nationalClass, ndp, sectionName })
      await MessageCenterApi.addMessage(page, topicLocation, comment)
      await MessageCenterApi.resolveTopic(page, topicLocation)

      await page.goto(ndpPath)
      await DOMUtils.ensureEditingUnlocked(page)

      await expect(reviewButton).toHaveClass(/\bresolved\b/)
      await reviewButton.click()
      await expect(MessageCenterUtils.getMessage(page, resolvedMessage)).toBeVisible()
      await expect(MessageCenterUtils.getResolveButton(page)).toHaveCount(0)

      await MessageCenterUtils.addComment(page, reply)

      await expect(MessageCenterUtils.getMessage(page, reply)).toBeVisible({ timeout: Timeouts.medium })
      await expect(MessageCenterUtils.getResolveButton(page)).toBeVisible({ timeout: Timeouts.medium })
      await expect(reviewButton).not.toHaveClass(/\bresolved\b/, { timeout: Timeouts.medium })
    })

    await test.step('Admin reloads the page and sees the comments still reopened', async () => {
      await page.reload()
      await DOMUtils.ensureEditingUnlocked(page)

      const topicLoaded = MessageCenterApi.waitForTopic(page)
      await reviewButton.click()
      const storedTopic = await topicLoaded
      expect(storedTopic.status).toBe(MessageTopicStatus.opened)
      expect(storedTopic.messages.map<string>((m) => m.message)).toEqual([comment, resolvedMessage, reply])

      await expect(MessageCenterUtils.getMessage(page, reply)).toBeVisible()
      await expect(MessageCenterUtils.getResolveButton(page)).toBeVisible()
      await expect(reviewButton).toHaveClass(/\bopen\b/)
      await expect(reviewButton).not.toHaveClass(/\bresolved\b/)
    })
  })
})

test.describe('Message center: review comments - admin and NC', () => {
  test.use({
    countrySeed: { countryIso, cycleName: CycleNames._2025, status: CountryStatus.editing },
    ndpSeeds: [{ countryIso, nationalClasses: [nationalClass], year: seededYear }],
    userSeed: {
      assessmentName: AssessmentNames.fra,
      countryIso,
      cycleName: CycleNames._2025,
      role: RoleName.NATIONAL_CORRESPONDENT,
    },
  })

  test('NC opens unread comments and sees them marked as read', async ({
    authenticatedPage,
    country,
    ndp,
    userPage,
  }) => {
    const ncPage = userPage
    expect(country.props.status).toBe(CountryStatus.editing)
    const topicLocation = MessageCenterUtils.getNationalClassTopicLocation({ nationalClass, ndp, sectionName })
    await MessageCenterApi.addMessage(authenticatedPage, topicLocation, comment)

    await ncPage.goto(ndpPath)
    await DOMUtils.ensureEditingUnlocked(ncPage)

    const reviewButton = NDPDomUtils.getNationalClassReviewButton(ncPage)
    await expect(reviewButton).toHaveClass(/\bunread\b/)
    await reviewButton.click()

    await expect(MessageCenterUtils.getMessage(ncPage, comment)).toBeVisible()
    await expect(reviewButton).not.toHaveClass(/\bunread\b/, { timeout: Timeouts.medium })
  })

  test('NC sees a new comment from the admin without reloading', async ({
    authenticatedPage,
    country,
    ndp,
    userPage,
  }) => {
    const ncPage = userPage
    expect(country.props.status).toBe(CountryStatus.editing)

    await ncPage.goto(ndpPath)
    await DOMUtils.ensureEditingUnlocked(ncPage)
    await NDPDomUtils.getNationalClassReviewButton(ncPage).click()
    await expect(MessageCenterUtils.getTopic(ncPage)).toContainText(enTranslation.review.noComments)

    const topicLocation = MessageCenterUtils.getNationalClassTopicLocation({ nationalClass, ndp, sectionName })
    await MessageCenterApi.addMessage(authenticatedPage, topicLocation, comment)

    await expect(MessageCenterUtils.getMessage(ncPage, comment)).toBeVisible({ timeout: Timeouts.medium })
  })

  test("NC sees the admin's comment marked as deleted without reloading", async ({
    authenticatedPage,
    country,
    ndp,
    userPage,
  }) => {
    const adminPage = authenticatedPage
    const ncPage = userPage
    expect(country.props.status).toBe(CountryStatus.editing)
    const topicLocation = MessageCenterUtils.getNationalClassTopicLocation({ nationalClass, ndp, sectionName })
    await MessageCenterApi.addMessage(adminPage, topicLocation, comment)

    await ncPage.goto(ndpPath)
    await DOMUtils.ensureEditingUnlocked(ncPage)
    await NDPDomUtils.getNationalClassReviewButton(ncPage).click()

    // Not looked up by text because the text goes away once the comment is deleted
    const ncMessage = MessageCenterUtils.getTopic(ncPage).locator('.message')
    await expect(ncMessage).toContainText(comment)

    await adminPage.goto(ndpPath)
    await DOMUtils.ensureEditingUnlocked(adminPage)
    await NDPDomUtils.getNationalClassReviewButton(adminPage).click()
    await expect(MessageCenterUtils.getMessage(adminPage, comment)).toBeVisible()
    await MessageCenterUtils.deleteComment(adminPage)

    await expect(ncMessage).toHaveClass(/\bdeleted\b/, { timeout: Timeouts.medium })
    await expect(ncMessage).toContainText(enTranslation.review.commentDeleted)
    await expect(ncMessage).not.toContainText(comment)
  })

  test('NC sees the delete button only on their own comment and no Resolve button', async ({
    authenticatedPage,
    country,
    ndp,
    userPage,
  }) => {
    const ncPage = userPage
    expect(country.props.status).toBe(CountryStatus.editing)
    const topicLocation = MessageCenterUtils.getNationalClassTopicLocation({ nationalClass, ndp, sectionName })
    await MessageCenterApi.addMessage(authenticatedPage, topicLocation, comment)

    await ncPage.goto(ndpPath)
    await DOMUtils.ensureEditingUnlocked(ncPage)
    await NDPDomUtils.getNationalClassReviewButton(ncPage).click()

    const adminMessage = MessageCenterUtils.getMessage(ncPage, comment)
    await expect(adminMessage).toBeVisible()
    await expect(adminMessage.locator('.btn-remove-msg')).toHaveCount(0)
    await expect(MessageCenterUtils.getResolveButton(ncPage)).toHaveCount(0)

    await MessageCenterUtils.addComment(ncPage, reply)

    const ncMessage = MessageCenterUtils.getMessage(ncPage, reply)
    await expect(ncMessage.locator('.btn-remove-msg')).toBeVisible({ timeout: Timeouts.medium })
    await expect(MessageCenterUtils.getResolveButton(ncPage)).toHaveCount(0)
  })

  test('NC sees no comment box on resolved comments', async ({ authenticatedPage, country, ndp, userPage }) => {
    const ncPage = userPage
    expect(country.props.status).toBe(CountryStatus.editing)
    const topicLocation = MessageCenterUtils.getNationalClassTopicLocation({ nationalClass, ndp, sectionName })
    await MessageCenterApi.addMessage(authenticatedPage, topicLocation, comment)
    await MessageCenterApi.resolveTopic(authenticatedPage, topicLocation)

    await ncPage.goto(ndpPath)
    await DOMUtils.ensureEditingUnlocked(ncPage)

    const reviewButton = NDPDomUtils.getNationalClassReviewButton(ncPage)
    await expect(reviewButton).toHaveClass(/\bresolved\b/)
    await reviewButton.click()

    // The comment box is also hidden while the comments load, so wait for them first
    await expect(MessageCenterUtils.getMessage(ncPage, resolvedMessage)).toBeVisible()
    await expect(MessageCenterUtils.getCommentBox(ncPage)).toHaveCount(0)
  })
})

test.describe('Message center: review comments - NC in review', () => {
  test.use({
    countrySeed: { countryIso, cycleName: CycleNames._2025, status: CountryStatus.review },
    ndpSeeds: [{ countryIso, nationalClasses: [nationalClass], year: seededYear }],
    userSeed: {
      assessmentName: AssessmentNames.fra,
      countryIso,
      cycleName: CycleNames._2025,
      role: RoleName.NATIONAL_CORRESPONDENT,
    },
  })

  test('NC sees the comments but no comment box while the country is in review', async ({
    authenticatedPage,
    country,
    ndp,
    userPage,
  }) => {
    const ncPage = userPage
    expect(country.props.status).toBe(CountryStatus.review)
    const topicLocation = MessageCenterUtils.getNationalClassTopicLocation({ nationalClass, ndp, sectionName })
    await MessageCenterApi.addMessage(authenticatedPage, topicLocation, comment)

    await ncPage.goto(ndpPath)
    await DOMUtils.ensureEditingUnlocked(ncPage)
    await NDPDomUtils.getNationalClassReviewButton(ncPage).click()

    // The comment box is also hidden while the comments load, so wait for them first
    await expect(MessageCenterUtils.getMessage(ncPage, comment)).toBeVisible()
    await expect(MessageCenterUtils.getCommentBox(ncPage)).toHaveCount(0)
  })
})
