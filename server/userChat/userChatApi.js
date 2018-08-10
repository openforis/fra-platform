const Promise = require('bluebird')
const R = require('ramda')

const db = require('../db/db')

const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendErr, serverUrl} = require('../utils/requestUtils')
const {createI18nPromise} = require('../../common/i18n/i18nFactory')
const {findUserById} = require('../user/userRepository')
const {getCountry} = require('../country/countryRepository')
const {sendMail} = require('../email/sendMail')

const {getChatMessages, addMessage} = require('./userChatRepository')

const createMail = async (country, i18n, sender, recipient, url) => {
  const link = `${url}/#/country/${country.countryIso}`
  const countryName = R.path(['listName', 'en'], country)

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
