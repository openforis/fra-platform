import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '@server/db/db'
import { fetchCountryMessages } from '@server/repository/countryMessageBoard/countryMessageBoardRepository'
import * as Requests from '@server/utils/requestUtils'
import { ApiEndPoint } from '@server/api/endpoint'

export const CountryMessageBoardGetAll = {
  init: (express: Express): void => {
    express.get(
      ApiEndPoint.CountryMessageBoard.getAll,
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const { countryIso } = req.params
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const userId = req.user.id

          const messages = await db.transaction(fetchCountryMessages, [countryIso, userId])

          res.json(messages)
        } catch (e) {
          Requests.sendErr(res, e)
        }
      }
    )
  },
}
