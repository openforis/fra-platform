import { Express, Response, Request } from 'express'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { CountryService } from '@server/controller'

export const CountryGetRegions = {
  init: (express: Express): void => {
    // Returns all regions from country_region table
    express.get(ApiEndPoint.Country.getRegions(), async (_req: Request, res: Response) => {
      try {
        const regions = await CountryService.getRegions()
        res.json(regions)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
