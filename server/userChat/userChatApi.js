const Promise = require('bluebird')
const R = require('ramda')

const db = require('../db/db')

const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendErr, serverUrl} = require('../utils/requestUtils')
const {createI18nPromise} = require('../../common/i18n/i18nFactory')
const {findUserById} = require('../user/userRepository')
const {getCountry} = require('../country/countryRepository')
const {sendMail} = require('../email/sendMail')

const {getChatMessages, addMessage, getChatUnreadMessages} = require('./userChatRepository')

const Auth = require('../auth/authApiMiddleware')

const createMail = async (country, i18n, sender, recipient, url) => {
  const link = `${url}/country/${country.countryIso}/`
  const countryName = i18n.t(`area.${country.countryIso}.listName`)

  return {
    to: recipient.email,
    subject: i18n.t('userChat.notificationEmail.subject', {
      sender: sender.name,
      country: countryName
    }),
    text: i18n.t('userChat.notificationEmail.textMessage', {
      sender: sender.name,
      recipient: recipient.name,
      link,
      url,
      country: countryName
    }),
    html: i18n.t('userChat.notificationEmail.htmlMessage', {
      sender: sender.name,
      recipient: recipient.name,
      link,
      url,
      country: countryName
    })
  }
}

const sendNotificationEmail = async (req, senderId, recipientId) => {
  const i18nPromise = createI18nPromise('en')
  const senderPromise = findUserById(senderId)
  const recipientPromise = findUserById(recipientId)
  const countryPromise = getCountry(req.params.countryIso)

  const [i18n, sender, recipient, country] = await Promise.all([i18nPromise, senderPromise, recipientPromise, countryPromise])
  const url = serverUrl(req)

  const notificationEmail = await createMail(country, i18n, sender, recipient, url)
  await sendMail(notificationEmail)
}

module.exports.init = app => {

  app.get('/userChat/:countryIso/messages/all', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const messages = await db.transaction(getChatMessages, [req.query.sessionUserId, req.query.otherUserId])

      res.json(messages)

    } catch (e) {
      sendErr(res, e)
    }
  })

  app.get('/userChat/:countryIso/messages/new', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const messages = await db.transaction(getChatUnreadMessages, [req.query.otherUserId, req.query.sessionUserId, true])

      res.json(messages)

    } catch (e) {
      sendErr(res, e)
    }
  })

  const checkUnreadMessages = async (req, fromUserId, toUserId) => {
    const unreadMessages = await db.transaction(getChatUnreadMessages, [fromUserId, toUserId])
    if (unreadMessages.length > 0)
      await sendNotificationEmail(req, fromUserId, toUserId)
  }

  app.post('/userChat/:countryIso/message', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      const {message, fromUserId, toUserId} = req.body

      const messageDb = await db.transaction(addMessage, [message, fromUserId, toUserId])

      setTimeout(() => checkUnreadMessages(req, fromUserId, toUserId), 5000)

      res.json(messageDb)

    } catch (e) {
      sendErr(res, e)
    }
  })

}
