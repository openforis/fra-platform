import { Express, Response, Request } from 'express'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { OriginalDataPointService } from '@server/service/originalDataPoint'
import { CountryIso } from '@core/country'

export const OdpGetReservedYears = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.OriginalDataPoint.reservedYears(), async (req: Request, res: Response) => {
      try {
        const { countryIso } = req.params
        const years = await OriginalDataPointService.getReservedYears({ countryIso: countryIso as CountryIso })
        res.json({ years })
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
