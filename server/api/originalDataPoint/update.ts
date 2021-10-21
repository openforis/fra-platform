import { Express, Response, Request } from 'express'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { OriginalDataPointService } from '@server/service/originalDataPoint'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { User } from '@core/auth'

export const OdpUpdate = {
  init: (express: Express): void => {
    express.patch(
      ApiEndPoint.OriginalDataPoint.one(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const { id } = req.params
          const odp = req.body
          const updatedOdp = await OriginalDataPointService.update({ id, odp, user: req.user as User })
          res.json({ odp: updatedOdp })
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
