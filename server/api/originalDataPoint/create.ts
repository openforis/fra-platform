import { Express, Response, Request } from 'express'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { OriginalDataPointService } from '@server/service/originalDataPoint'
import { ApiAuthMiddleware } from '@server/api/middleware'

export const OdpCreate = {
  init: (express: Express): void => {
    express.post(
      ApiEndPoint.OriginalDataPoint.create(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const { countryIso } = req.params
          const odpId = await OriginalDataPointService.create({ countryIso })
          res.json({ odpId })
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
