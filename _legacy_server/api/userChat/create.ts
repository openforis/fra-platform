import { Express, Response, Request } from 'express'
import * as db from '@server/db/db_deprecated'
import { addMessage, getChatUnreadMessages } from '@server/repository/userChat/userChatRepository'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { sendErr, serverUrl } from '@server/utils/requests'
import { createI18nPromise } from '@common/i18n/i18nFactory'
import { findUserById } from '@server/repository/user/_legacy_userRepository'
import { getCountry } from '@server/repository/country/getCountry'
import { sendMail } from '@server/controller/email/sendMail'
import { ApiEndPoint } from '@common/api/endpoint'

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

const checkUnreadMessages = async (req: any, fromUserId: any, toUserId: any) => {
  const unreadMessages = await db.transaction(getChatUnreadMessages, [fromUserId, toUserId])
  if (unreadMessages.length > 0) await sendNotificationEmail(req, fromUserId, toUserId)
}
export const UserChatCreate = {
  init: (express: Express): void => {
    express.post(
      ApiEndPoint.UserChat.create(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
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
  },
}
