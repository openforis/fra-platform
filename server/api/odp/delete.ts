import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { allowedToEditDataCheck } from '@server/assessment/assessmentEditAccessControl'
import * as db from '@server/db/db'
import * as odpRepository from '@server/repository/odp/odpRepository'
import * as Requests from '@server/utils/requestUtils'
import { ApiEndPoint } from '@common/api/endpoint'

export const OdpDelete = {
  init: (express: Express): void => {
    express.delete(
      ApiEndPoint.Odp.delete(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const { countryIso } = req.query
          await allowedToEditDataCheck(countryIso, req.user, 'extentOfForest')

          await db.transaction(odpRepository.deleteOdp, [req.query.odpId, req.user])

          Requests.sendOk(res)
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
