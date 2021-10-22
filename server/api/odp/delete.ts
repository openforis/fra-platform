import { Express, Request, Response } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'

export const OdpDelete = {
  init: (express: Express): void => {
    express.delete(
      ApiEndPoint.Odp.delete(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (_: Request, res: Response) => {
        Requests.sendOk(res)
      }
    )
  },
}
