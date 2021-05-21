import { createI18nPromise } from '@common/i18n/i18nFactory'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '../db/db'

import { checkCountryAccessFromReqParams } from '../utils/accessControl'
import { sendErr, serverUrl } from '../utils/requestUtils'
import { findUserById } from '../user/userRepository'
import { getCountry } from '../country/countryRepository'
import { sendMail } from '../email/sendMail'

import { getChatMessages, addMessage, getChatUnreadMessages } from './userChatRepository'

const createMail = async (country: any, i18n: any, sender: any, recipient: any, url: any) => {
  const link = `${url}/country/${country.countryIso}/`
  const countryName = i18n.t(`area.${country.countryIso}.listName`)

  return {
    to: recipient.email,
    subject: i18n.t('userChat.notificationEmail.subject', {
      sender: sender.name,
      country: countryName,
    }),
    text: i18n.t('userChat.notificationEmail.textMessage', {
      sender: sender.name,
      recipient: recipient.name,
      link,
      url,
      country: countryName,
    }),
    html: i18n.t('userChat.notificationEmail.htmlMessage', {
      sender: sender.name,
      recipient: recipient.name,
      link,
      url,
      country: countryName,
    }),
  }
}

const sendNotificationEmail = async (req: any, senderId: any, recipientId: any) => {
  const i18nPromise = createI18nPromise('en')
  const senderPromise = findUserById(senderId)
  const recipientPromise = findUserById(recipientId)
  const countryPromise = getCountry(req.params.countryIso)

  const [i18n, sender, recipient, country] = await Promise.all([
    i18nPromise,
    senderPromise,
    recipientPromise,
    countryPromise,
  ])
  const url = serverUrl(req)

  const notificationEmail = await createMail(country, i18n, sender, recipient, url)
  await sendMail(notificationEmail)
}

export const init = (app: any) => {
  app.get('/userChat/:countryIso/messages/all', async (req: any, res: any) => {
    try {
      checkCountryAccessFromReqParams(req)

      const messages = await db.transaction(getChatMessages, [req.query.sessionUserId, req.query.otherUserId])

      res.json(messages)
    } catch (e) {
      sendErr(res, e)
    }
  })

  app.get('/userChat/:countryIso/messages/new', async (req: any, res: any) => {
    try {
      checkCountryAccessFromReqParams(req)

      const messages = await db.transaction(getChatUnreadMessages, [
        req.query.otherUserId,
        req.query.sessionUserId,
        true,
      ])

      res.json(messages)
    } catch (e) {
      sendErr(res, e)
    }
  })

  const checkUnreadMessages = async (req: any, fromUserId: any, toUserId: any) => {
    const unreadMessages = await db.transaction(getChatUnreadMessages, [fromUserId, toUserId])
    if (unreadMessages.length > 0) await sendNotificationEmail(req, fromUserId, toUserId)
  }

  app.post(
    '/userChat/:countryIso/message',
    ApiAuthMiddleware.requireCountryEditPermission,
    async (req: any, res: any) => {
      try {
        const { message, fromUserId, toUserId } = req.body

        const messageDb = await db.transaction(addMessage, [message, fromUserId, toUserId])

        setTimeout(() => checkUnreadMessages(req, fromUserId, toUserId), 5000)

        res.json(messageDb)
      } catch (e) {
        sendErr(res, e)
      }
    }
  )
}
