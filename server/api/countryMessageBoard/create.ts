import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '@server/db/db'
import { persistMessage } from '@server/repository/countryMessageBoard/countryMessageBoardRepository'
import * as Requests from '@server/utils/requestUtils'
import { ApiEndPoint } from '@common/api/endpoint'

export const CountryMessageBoardCreate = {
  init: (express: Express): void => {
    express.post(
      ApiEndPoint.CountryMessageBoard.create(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const { message, fromUserId } = req.body
          const { countryIso } = req.params

          await db.transaction(persistMessage, [countryIso, message, fromUserId])

          Requests.sendOk(res)
        } catch (e) {
          Requests.sendErr(res, e)
        }
      }
    )
  },
}
