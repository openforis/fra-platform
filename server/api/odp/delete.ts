import { Express, Request, Response } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { allowedToEditDataCheck } from '@server/assessment/assessmentEditAccessControl'
import * as db from '@server/db/db_deprecated'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { OdpService } from '@server/service'

export const OdpDelete = {
  init: (express: Express): void => {
    express.delete(
      ApiEndPoint.Odp.delete(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const { countryIso } = req.query
          await allowedToEditDataCheck(countryIso, req.user, 'extentOfForest')

          await db.transaction(OdpService.deleteOdp, [req.query.odpId, req.user])

          Requests.sendOk(res)
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
