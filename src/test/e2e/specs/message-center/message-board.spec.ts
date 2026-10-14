import { enTranslation } from 'i18n/resources/en'

import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { MessageTopicType } from 'meta/messageCenter/messageTopic'
import { Topics } from 'meta/messageCenter/topics'
import { Routes } from 'meta/routes/routes'
import { RoleName } from 'meta/user/role/name'

import { MessageCenterApi, type TopicLocation } from 'test/e2e/api/messageCenter'
import { Timeouts } from 'test/e2e/config/timeouts'
import { expect, test } from 'test/e2e/fixtures/user'
import { MessageCenterUtils } from 'test/e2e/utils/messageCenter'

// Every X country is taken, so the message center specs use BGR
const countryIso = 'BGR'
const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const countryHomePath = Routes.CountryHome.generatePath({ assessmentName, countryIso, cycleName })
const countryName = enTranslation.area[countryIso].listName

// Only this spec posts on BGR's board, so specs running in parallel don't add to it
const boardLocation: TopicLocation = {
  countryIso,
  key: Topics.getMessageBoardCountryKey(),
  sectionName: MessageTopicType.messageBoard,
  type: MessageTopicType.messageBoard,
}

test.describe('Message center: message board', () => {
  test.use({ userSeed: { assessmentName, countryIso, cycleName, role: RoleName.NATIONAL_CORRESPONDENT } })

  test('NC posts on the message board and sees the message', async ({ user }) => {
    const nc = user
    // The board keeps older messages, so the text has to be unique to the test
    const message = `Please check the growing stock data ${Date.now()}`

    await nc.page.goto(countryHomePath)
    await MessageCenterUtils.getMessageBoardButton(nc.page).click()

    await expect(MessageCenterUtils.getTopic(nc.page).locator('.topic-title')).toHaveText(countryName)
    // The comment box only shows once the board loads
    await expect(MessageCenterUtils.getCommentBox(nc.page)).toBeVisible()

    await MessageCenterUtils.addComment(nc.page, message)

    await expect(MessageCenterUtils.getMessage(nc.page, message)).toBeVisible({ timeout: Timeouts.medium })
  })

  test('NC sees a new message from another NC on the board without reloading', async ({ otherUser, user }) => {
    const nc = user
    const otherNc = otherUser
    const message = `Please check the growing stock data ${Date.now()}`

    await nc.page.goto(countryHomePath)
    await MessageCenterUtils.getMessageBoardButton(nc.page).click()
    await expect(MessageCenterUtils.getCommentBox(nc.page)).toBeVisible()

    await MessageCenterApi.addMessage(otherNc.page, boardLocation, message)

    await expect(MessageCenterUtils.getMessage(nc.page, message)).toBeVisible({ timeout: Timeouts.medium })
  })

  test('NC who read the board sees one unread message after another NC posts', async ({ otherUser, user }) => {
    const nc = user
    const otherNc = otherUser
    const message = `Please check the growing stock data ${Date.now()}`

    await nc.page.goto(countryHomePath)
    const boardButton = MessageCenterUtils.getMessageBoardButton(nc.page)
    await boardButton.click()
    // Once the board loads, the older messages count as read
    await expect(MessageCenterUtils.getCommentBox(nc.page)).toBeVisible()

    await MessageCenterApi.addMessage(otherNc.page, boardLocation, message)

    // The unread count only loads with the page
    await nc.page.reload()
    await expect(boardButton.locator('.btn-message__count')).toHaveText('1')
  })

  test('Admin sees the Message board button disabled', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(countryHomePath)

    await expect(MessageCenterUtils.getMessageBoardButton(page)).toBeDisabled()
  })
})
