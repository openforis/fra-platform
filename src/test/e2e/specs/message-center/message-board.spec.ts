import { enTranslation } from 'i18n/resources/en'

import { type Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { type Cycle } from 'meta/assessment/cycle'
import { CycleNames } from 'meta/assessment/cycle/names'
import { type MessageTopic, MessageTopicType } from 'meta/messageCenter/messageTopic'
import { Topics } from 'meta/messageCenter/topics'
import { Routes } from 'meta/routes/routes'
import { Sockets } from 'meta/socket/sockets'
import { RoleName } from 'meta/user/role/name'

import { MessageCenterApi, type TopicLocation } from 'test/e2e/api/messageCenter'
import { Timeouts } from 'test/e2e/config/timeouts'
import { expect, test } from 'test/e2e/fixtures/user'
import { MessageCenterUtils } from 'test/e2e/utils/messageCenter'
import { SocketUtils } from 'test/e2e/utils/socket'

// Every X country is taken, so the message center specs use BGR
const countryIso = 'BGR'
const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const assessment = { props: { name: assessmentName } } as Assessment
const cycle = { name: cycleName } as Cycle
const countryHomePath = Routes.CountryHome.generatePath({ assessmentName, countryIso, cycleName })
const countryName = enTranslation.area[countryIso].listName

// Only this spec posts on BGR's board, so specs running in parallel don't add to it
const boardLocation: TopicLocation = {
  countryIso,
  key: Topics.getMessageBoardCountryKey(),
  sectionName: MessageTopicType.messageBoard,
  type: MessageTopicType.messageBoard,
}
const boardMessageAddEvent = Sockets.getTopicMessageAddEvent({
  assessment,
  cycle,
  topic: { countryIso, key: boardLocation.key } as MessageTopic,
})

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

  test('NC sees a new message from another NC on the board without reloading, then still sees it as unread after reloading, while the admin gets it and a logged out user gets nothing', async ({
    authenticatedPage: adminPage,
    otherUser,
    publicPage: loggedOutPage,
    user,
  }) => {
    const nc = user
    const otherNc = otherUser
    const message = `Please check the growing stock data ${Date.now()}`
    const boardButton = MessageCenterUtils.getMessageBoardButton(nc.page)
    const ncPackets = SocketUtils.recordPackets(nc.page)
    const adminPackets = SocketUtils.recordPackets(adminPage)
    const loggedOutPackets = SocketUtils.recordPackets(loggedOutPage)

    await adminPage.goto(countryHomePath)
    await SocketUtils.waitForConnect(adminPackets)
    await loggedOutPage.goto(Routes.Root.path.absolute)
    await SocketUtils.waitForConnect(loggedOutPackets)

    await test.step('NC sees a new message from another NC on the board without reloading', async () => {
      await nc.page.goto(countryHomePath)
      await SocketUtils.waitForConnect(ncPackets)
      await boardButton.click()
      // Once the board loads, the older messages count as read
      await expect(MessageCenterUtils.getCommentBox(nc.page)).toBeVisible()

      await MessageCenterApi.addMessage(otherNc.page, boardLocation, message)

      await expect(MessageCenterUtils.getMessage(nc.page, message)).toBeVisible({ timeout: Timeouts.medium })
    })

    await test.step('The admin gets the message and a logged out user gets nothing', async () => {
      await expect.poll(() => adminPackets.eventNames).toContain(boardMessageAddEvent)

      // The NC and the admin already have the message, so a logged out user would have it by now if it were sent to them
      expect(loggedOutPackets.eventNames).not.toContain(boardMessageAddEvent)
    })

    await test.step('NC who read the board sees one unread message after another NC posts', async () => {
      await nc.page.reload()
      await expect(boardButton.locator('.btn-message__count')).toHaveText('1')
    })
  })

  test('Admin sees the Message board button disabled', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(countryHomePath)

    await expect(MessageCenterUtils.getMessageBoardButton(page)).toBeDisabled()
  })
})
