// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Promise'.
const Promise = require('bluebird')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'checkCount... Remove this comment to see the full error message
const { checkCountryAccessFromReqParams } = require('../utils/accessControl')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const { sendErr, serverUrl } = require('../utils/requestUtils')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'createI18n... Remove this comment to see the full error message
const { createI18nPromise } = require('../../common/i18n/i18nFactory')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'findUserBy... Remove this comment to see the full error message
const { findUserById } = require('../user/userRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getCountry... Remove this comment to see the full error message
const { getCountry } = require('../country/countryRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendMail'.
const { sendMail } = require('../email/sendMail')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getChatMes... Remove this comment to see the full error message
const { getChatMessages, addMessage, getChatUnreadMessages } = require('./userChatRepository')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Auth'.
const Auth = require('../auth/authApiMiddleware')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'createMail... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(2554) FIXME: Expected 6 arguments, but got 5.
  const notificationEmail = await createMail(country, i18n, sender, recipient, url)
  await sendMail(notificationEmail)
}

module.exports.init = (app: any) => {
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

  app.post('/userChat/:countryIso/message', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      const { message, fromUserId, toUserId } = req.body

      const messageDb = await db.transaction(addMessage, [message, fromUserId, toUserId])

      setTimeout(() => checkUnreadMessages(req, fromUserId, toUserId), 5000)

      res.json(messageDb)
    } catch (e) {
      sendErr(res, e)
    }
  })
}
