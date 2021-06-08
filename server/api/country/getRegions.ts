import { Express, Response, Request } from 'express'
import * as Requests from '@server/utils/requestUtils'
import { ApiEndPoint } from '@common/api/endpoint'
import * as CountryService from '../../service/country/countryService'

export const CountryGetRegions = {
  init: (express: Express): void => {
    // Returns all regions from country_region table
    express.get(ApiEndPoint.Country.getRegions(), async (req: Request, res: Response) => {
      try {
        const regions = await CountryService.getRegions()
        res.json(regions)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
