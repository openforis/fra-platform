import { Express, Response, Request } from 'express'
import * as Requests from '@server/utils/requestUtils'
import { EndPoint } from '@server/api/endpoint'
import * as CountryService from '../../service/country/countryService'

export const CountryGetRegionGroups = {
  init: (express: Express): void => {
    // Returns all region groups from region_group table
    express.get(EndPoint.Country.getRegionGroups, async (req: Request, res: Response) => {
      try {
        const regionGroups = await CountryService.getRegionGroups()
        res.json(regionGroups)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
