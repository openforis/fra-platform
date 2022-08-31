import { Express, Response, Request } from 'express'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { OriginalDataPointService } from '@server/controller/originalDataPoint'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { User } from '@core/auth'

export const OdpCreate = {
  init: (express: Express): void => {
    express.post(
      ApiEndPoint.OriginalDataPoint.many(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const { countryIso } = req.body
          const odp = await OriginalDataPointService.create({ countryIso, user: req.user as User })
          res.json({ odp })
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
