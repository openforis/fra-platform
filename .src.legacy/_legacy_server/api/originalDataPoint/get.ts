import { Express, Response, Request } from 'express'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { OriginalDataPointService } from '@server/controller/originalDataPoint'

export const OdpGet = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.OriginalDataPoint.many(), async (req: Request, res: Response) => {
      try {
        const { countryIso } = req.query
        const odps = await OriginalDataPointService.getMany({ countryIso: countryIso as string })
        res.json(odps)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })

    express.get(ApiEndPoint.OriginalDataPoint.one(), async (req: Request, res: Response) => {
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
