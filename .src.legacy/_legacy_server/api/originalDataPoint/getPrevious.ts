import { Express, Response, Request } from 'express'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { OriginalDataPointService } from '@server/controller/originalDataPoint'

export const OdpGetPrevious = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.OriginalDataPoint.previous(), async (req: Request, res: Response) => {
      try {
        const { id } = req.params
        const previousOdp = await OriginalDataPointService.getPrevious({ id })
        res.json({ odp: previousOdp })
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
