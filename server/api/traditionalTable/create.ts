import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '@server/db/db'
import * as repository from '@server/repository/traditionalTable/traditionalTableRepository'
import { sendErr, sendOk } from '@server/utils/requestUtils'
import { ApiEndPoint } from '@common/api/endpoint'

export const TraditionalTableCreate = {
  init: (express: Express): void => {
    express.post(
      ApiEndPoint.TraditionalTable.create(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const {
            user,
            body,
            params: { countryIso, tableSpecName },
          } = req

          await db.transaction(repository.save, [user, countryIso, tableSpecName, body])

          sendOk(res)
        } catch (err) {
          sendErr(res, err)
        }
      }
    )
  },
}
