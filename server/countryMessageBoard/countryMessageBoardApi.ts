// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const { sendErr, sendOk } = require('../utils/requestUtils')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'persistMes... Remove this comment to see the full error message
const { persistMessage, fetchCountryMessages, fetchCountryUnreadMessages } = require('./countryMessageBoardRepository')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Auth'.
const Auth = require('../auth/authApiMiddleware')

module.exports.init = (app: any) => {
  app.get(
    '/countryMessageBoard/:countryIso/messages/all',
    Auth.requireCountryEditPermission,
    async (req: any, res: any) => {
      try {
        const { countryIso } = req.params
        const userId = req.user.id

        const messages = await db.transaction(fetchCountryMessages, [countryIso, userId])

        res.json(messages)
      } catch (e) {
        sendErr(res, e)
      }
    }
  )

  app.get(
    '/countryMessageBoard/:countryIso/messages/new',
    Auth.requireCountryEditPermission,
    async (req: any, res: any) => {
      try {
        const { countryIso } = req.params
        const userId = req.user.id

        const messages = await db.transaction(fetchCountryUnreadMessages, [countryIso, userId, true])

        res.json(messages)
      } catch (e) {
        sendErr(res, e)
      }
    }
  )

  app.post(
    '/countryMessageBoard/:countryIso/message',
    Auth.requireCountryEditPermission,
    async (req: any, res: any) => {
      try {
        const { message, fromUserId } = req.body
        const { countryIso } = req.params

        await db.transaction(persistMessage, [countryIso, message, fromUserId])

        sendOk(res)
      } catch (e) {
        sendErr(res, e)
      }
    }
  )
}
