import { Express, Request, Response } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'

export const OdpMarkAsActual = {
  init: (express: Express): void => {
    express.post(
      ApiEndPoint.Odp.markAsActual(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (_: Request, res: Response) => {
        Requests.sendOk(res)
      }
    )
  },
}
