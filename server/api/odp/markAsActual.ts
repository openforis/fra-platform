import { Express, Request, Response } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { OdpService } from '@server/service'
import { User } from '@core/auth'

export const OdpMarkAsActual = {
  init: (express: Express): void => {
    express.post(
      ApiEndPoint.Odp.markAsActual(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          await OdpService.markAsActual({
            odpId: String(req.query.odpId),
            user: req.user as User,
          })

          Requests.sendOk(res)
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
