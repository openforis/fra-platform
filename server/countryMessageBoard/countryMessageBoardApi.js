const {sendErr, sendOk} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

const db = require('../db/db')

const {persistMessage} = require('./countryMessageBoardRepository')

module.exports.init = app => {
  // app.get('/userChat/:countryIso/messages', async (req, res) => {
  //   try {
  //     checkCountryAccessFromReqParams(req)
  //
  //     const messages = await db.transaction(getChatMessages, [req.query.sessionUserId, req.query.otherUserId])
  //
  //     res.json(messages)
  //
  //   } catch (e) {
  //     sendErr(res, e)
  //   }
  // })

  app.post('/countryMessageBoard/:countryIso/message', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const {message, fromUserId} = req.body
      const {countryIso} = req.params

      await db.transaction(persistMessage, [countryIso, message, fromUserId])

      sendOk(res)

    } catch (e) {
      sendErr(res, e)
    }
  })
}
