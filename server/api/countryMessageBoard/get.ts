import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '@server/db/db'
import { fetchCountryUnreadMessages } from '@server/countryMessageBoard/countryMessageBoardRepository'
import * as Requests from '@server/utils/requestUtils'

export const CountryMessageBoardGet = {
  init: (express: Express): void => {
    express.get(
      '/api/countryMessageBoard/:countryIso/messages/new',
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const { countryIso } = req.params
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const userId = req.user.id

          const messages = await db.transaction(fetchCountryUnreadMessages, [countryIso, userId, true])

          res.json(messages)
        } catch (e) {
          Requests.sendErr(res, e)
        }
      }
    )
  },
}
