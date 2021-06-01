import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '@server/db/db'
import * as odpRepository from '@server/repository/odp/odpRepository'
import * as Requests from '@server/utils/requestUtils'
import { EndPoint } from '@server/api/endpoint'

export const OdpMarkAsActual = {
  init: (express: Express): void => {
    express.post(
      EndPoint.Odp.markAsActual,
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          await db.transaction(odpRepository.markAsActual, [req.query.odpId, req.user])

          Requests.sendOk(res)
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
