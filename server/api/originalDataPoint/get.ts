import { Express, Response, Request } from 'express'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { OriginalDataPointService } from '@server/service/originalDataPoint'

export const OdpGet = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.OriginalDataPoint.get(), async (req: Request, res: Response) => {
      try {
        const { id } = req.params
        const odp = await OriginalDataPointService.get({ id })
        res.json({ odp })
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
