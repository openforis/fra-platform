import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'

export const OdpGetPrevious = {
  init: (express: Express): void => {
    express.get(
      ApiEndPoint.Odp.getPrevious(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (_: Request, res: Response) => {
        Requests.sendOk(res)
      }
    )
  },
}
