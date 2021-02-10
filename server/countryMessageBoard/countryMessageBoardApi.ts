import { sendErr, sendOk } from '../utils/requestUtils'

import * as db from '../db/db'

import { persistMessage, fetchCountryMessages, fetchCountryUnreadMessages } from './countryMessageBoardRepository'

import * as Auth from '../auth/authApiMiddleware'

export const init = (app: any) => {
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
