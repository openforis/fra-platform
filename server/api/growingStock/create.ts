import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '@server/db/db'
import * as repository from '@server/repository/growingStock/growingStockRepository'
import { sendErr } from '@server/utils/requestUtils'
import { ApiEndPoint } from '@common/api/endpoint'

export const GrowingStockCreate = {
  init: (express: Express): void => {
    express.post(
      ApiEndPoint.GrowingStock.create(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          await db.transaction(repository.persistBothGrowingStock, [req.user, req.params.countryIso, req.body])
          res.json({})
        } catch (err) {
          sendErr(res, err)
        }
      }
    )
  },
}
