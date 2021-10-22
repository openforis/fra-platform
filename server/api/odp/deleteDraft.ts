import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'

export const OdpDeleteDraft = {
  init: (express: Express): void => {
    express.delete(
      ApiEndPoint.Odp.deleteDraft(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (_: Request, res: Response) => {
        Requests.sendOk(res)
      }
    )
  },
}
