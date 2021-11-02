import { Express, Response, Request } from 'express'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { OriginalDataPointService } from '@server/service/originalDataPoint'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { User } from '@core/auth'

export const OdpRemove = {
  init: (express: Express): void => {
    express.delete(
      ApiEndPoint.OriginalDataPoint.one(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const { id } = req.params
          const odp = await OriginalDataPointService.remove({ id, user: req.user as User })
          res.json({ odp })
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
