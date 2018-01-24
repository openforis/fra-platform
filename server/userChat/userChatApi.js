const R = require('ramda')

const db = require('../db/db')

const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendErr} = require('../utils/requestUtils')

const {getChatMessages, addMessage} = require('./userChatRepository')

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

      const persistedMessage = await db.transaction(addMessage, [message, fromUserId, toUserId])

      res.json(persistedMessage)

    } catch (e) {
      sendErr(res, e)
    }
  })

}
