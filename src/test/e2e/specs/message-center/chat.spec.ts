import { enTranslation } from 'i18n/resources/en'

import { type Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { type Cycle } from 'meta/assessment/cycle'
import { CycleNames } from 'meta/assessment/cycle/names'
import { Routes } from 'meta/routes/routes'
import { SectionNames as RouteSectionNames } from 'meta/routes/sectionNames'
import { Sockets } from 'meta/socket/sockets'
import { RoleName } from 'meta/user/role/name'

import { MessageCenterApi } from 'test/e2e/api/messageCenter'
import { Timeouts } from 'test/e2e/config/timeouts'
import { expect, test } from 'test/e2e/fixtures/user'
import { MailUtil } from 'test/e2e/utils/Mail'
import { MessageCenterUtils } from 'test/e2e/utils/messageCenter'
import { SocketUtils } from 'test/e2e/utils/socket'

// Every X country is taken, so the message center specs use BGR
const countryIso = 'BGR'
const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const assessment = { props: { name: assessmentName } } as Assessment
const cycle = { name: cycleName } as Cycle
const collaboratorsPath = Routes.CountryHomeSection.generatePath({
  assessmentName,
  countryIso,
  cycleName,
  sectionName: RouteSectionNames.Country.Home.collaborators,
})
const countryHomePath = Routes.CountryHome.generatePath({ assessmentName, countryIso, cycleName })
const countryName = enTranslation.area[countryIso].listName

const message = 'Can you check the growing stock data?'
const reply = 'Yes, I will check it today'

test.describe('Message center: chat - NC to NC', () => {
  test.use({ userSeed: { assessmentName, countryIso, cycleName, role: RoleName.NATIONAL_CORRESPONDENT } })

  test('NC messages another NC from their card and sees the message, and the other NC gets an email', async ({
    otherUser,
    user,
  }) => {
    const nc = user
    const otherNc = otherUser

    await test.step('NC messages another NC from their card and sees the message', async () => {
      await nc.page.goto(collaboratorsPath)
      await MessageCenterUtils.getChatButton(nc.page, otherNc.fullName).click()

      const topic = MessageCenterUtils.getTopic(nc.page)
      await expect(topic.locator('.topic-title')).toContainText(otherNc.fullName)
      // Each test invites new NCs, so their chat starts empty
      await expect(topic).toContainText(enTranslation.review.noComments)

      await MessageCenterUtils.addComment(nc.page, message)

      await expect(MessageCenterUtils.getMessage(nc.page, message)).toBeVisible({ timeout: Timeouts.medium })
    })

    await test.step('The other NC gets an email', async () => {
      // The first name has the timestamp, so only this test's email has it
      const email = await MailUtil.getEmailWithText(otherNc.email, nc.name)

      expect(email.subject).toContain(nc.fullName)
      expect(email.subject).toContain(countryName)
      expect(email.body).toContain(countryHomePath)
    })
  })

  test('NC replies to an unread message and the other NC sees the reply without reloading, while the admin and a logged out user get nothing', async ({
    authenticatedPage: adminPage,
    otherUser,
    publicPage: loggedOutPage,
    user,
  }) => {
    const nc = user
    const otherNc = otherUser
    const otherNcPackets = SocketUtils.recordPackets(otherNc.page)
    const adminPackets = SocketUtils.recordPackets(adminPage)
    const loggedOutPackets = SocketUtils.recordPackets(loggedOutPage)

    await adminPage.goto(countryHomePath)
    await SocketUtils.waitForConnect(adminPackets)
    await loggedOutPage.goto(Routes.Root.path.absolute)
    await SocketUtils.waitForConnect(loggedOutPackets)

    await otherNc.page.goto(collaboratorsPath)
    await SocketUtils.waitForConnect(otherNcPackets)
    await MessageCenterUtils.getChatButton(otherNc.page, nc.fullName).click()
    await expect(MessageCenterUtils.getTopic(otherNc.page)).toContainText(enTranslation.review.noComments)
    await MessageCenterUtils.addComment(otherNc.page, message)

    await nc.page.goto(collaboratorsPath)
    const chatButton = MessageCenterUtils.getChatButton(nc.page, otherNc.fullName)
    await expect(chatButton.locator('.btn-message__count')).toHaveText('1')

    const topicLoaded = MessageCenterApi.waitForTopic(nc.page)
    await chatButton.click()
    const topic = await topicLoaded
    const messageAddEvent = Sockets.getTopicMessageAddEvent({ assessment, cycle, topic })
    await expect(MessageCenterUtils.getMessage(nc.page, message)).toBeVisible()
    await MessageCenterUtils.addComment(nc.page, reply)

    await expect(MessageCenterUtils.getMessage(otherNc.page, reply)).toBeVisible({ timeout: Timeouts.medium })
    await expect.poll(() => otherNcPackets.eventNames).toContain(messageAddEvent)

    // The other NC already has the reply, so the others would have it by now if it were sent to them
    expect(adminPackets.eventNames).not.toContain(messageAddEvent)
    expect(loggedOutPackets.eventNames).not.toContain(messageAddEvent)
  })

  test('Admin sees the Message button disabled on the card of an NC', async ({ authenticatedPage, user }) => {
    const page = authenticatedPage
    const nc = user

    await page.goto(collaboratorsPath)

    await expect(MessageCenterUtils.getChatButton(page, nc.fullName)).toBeDisabled()
  })
})
