import { Express, Response, Request } from 'express'
import * as Requests from '@server/utils/requestUtils'
import * as CountryService from '../../country/countryService'

export const CountryGetRegionGroups = {
  init: (express: Express): void => {
    // Returns all region groups from region_group table
    express.get('/api/country/regionGroups', async (req: Request, res: Response) => {
      try {
        const regionGroups = await CountryService.getRegionGroups()
        res.json(regionGroups)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
