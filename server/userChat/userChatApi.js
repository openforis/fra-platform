const Promise = require('bluebird')

const db = require('../db/db')

const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendErr, serverUrl} = require('../utils/requestUtils')
const {createI18nPromise} = require('../../common/i18n/i18nFactory')
const {findUserById} = require('../user/userRepository')
const {sendMail} = require('../email/sendMail')

const {getChatMessages, addMessage} = require('./userChatRepository')

const createMail = async (countryIso, i18n, sender, recipient, url) => {
  const link = `${url}/#/country/${countryIso}`
  return {
    to: recipient.email,
    subject: i18n.t('userChat.notificationEmail.subject', {sender: sender.name}),
    text: i18n.t('userChat.notificationEmail.textMessage', {sender: sender.name, recipient: recipient.name, link, url}),
    html: i18n.t('userChat.notificationEmail.htmlMessage', {sender: sender.name, recipient: recipient.name, link, url})
  }
}

const sendNotificationEmail = async (req, senderId, recipientId) => {
  const i18nPromise = createI18nPromise('en')
  const senderPromise = findUserById(senderId)
  const recipientPromise = findUserById(recipientId)

  const [i18n, sender, recipient] = await Promise.all([i18nPromise, senderPromise, recipientPromise])
  const url = serverUrl(req)

  const notificationEmail = await createMail(req.params.countryIso, i18n, sender, recipient, url)
  await sendMail(notificationEmail)
}

module.exports.init = app => {

  app.get('/userChat/:countryIso/messages', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const messages = await db.transaction(getChatMessages, [req.query.sessionUserId, req.query.otherUserId])

      res.json(messages)

    } catch (e) {
      sendErr(res, e)
    }
  })

  app.post('/userChat/:countryIso/message', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const {message, fromUserId, toUserId} = req.body

      const addMessageResponse = await db.transaction(addMessage, [message, fromUserId, toUserId])

      if (addMessageResponse.unreadMessages === 0)
        await sendNotificationEmail(req, fromUserId, toUserId)

      res.json(addMessageResponse.message)

    } catch (e) {
      sendErr(res, e)
    }
  })

}
