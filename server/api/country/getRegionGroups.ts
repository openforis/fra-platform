import { Express, Response, Request } from 'express'
import * as Requests from '@server/utils/requestUtils'
import { ApiEndPoint } from '@server/api/endpoint'
import { CountryService } from '@server/service'

export const CountryGetRegionGroups = {
  init: (express: Express): void => {
    // Returns all region groups from region_group table
    express.get(ApiEndPoint.Country.getRegionGroups, async (req: Request, res: Response) => {
      try {
        const regionGroups = await CountryService.getRegionGroups()
        res.json(regionGroups)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
