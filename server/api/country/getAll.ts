import { Express, Response, Request } from 'express'
import * as CountryService from '@server/country/countryService'
import * as VersionService from '@server/versioning/service'
import * as Requests from '@server/utils/requestUtils'
import * as countryRepository from '@server/country/countryRepository'

export const CountryGetAll = {
  init: (express: Express): void => {
    express.get('/api/country/all', async (req: any, res: Response) => {
      try {
        const schmeName = await VersionService.getDatabaseSchema(req)
        const userRoles = (Request as any).getUserRoles(req)
        const result = await countryRepository.getAllowedCountries(userRoles, schmeName)
        res.json(result)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })

    express.get('/api/countries/', async (req: any, res: Response) => {
      try {
        // This endpoint does not return Atlantis countries (first countryIso character = X)
        const countries = (await CountryService.getAllCountriesList()).filter(
          (country: any) => country.countryIso[0] !== 'X'
        )
        res.json(countries)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
