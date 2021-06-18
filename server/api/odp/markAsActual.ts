import { Express, Request, Response } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '@server/db/db'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { OdpService } from '@server/service'

export const OdpMarkAsActual = {
  init: (express: Express): void => {
    express.post(
      ApiEndPoint.Odp.markAsActual(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          await db.transaction(OdpService.markAsActual, [req.query.odpId, req.user])

          Requests.sendOk(res)
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
