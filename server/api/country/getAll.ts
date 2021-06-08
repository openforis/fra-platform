import { Express, Response, Request } from 'express'
import * as CountryService from '@server/service/country/countryService'
import * as VersionService from '@server/service/versioning/service'
import * as Requests from '@server/utils/requestUtils'
import * as countryRepository from '@server/repository/country/countryRepository'
import { ApiEndPoint } from '@common/api/endpoint'

export const CountryGetAll = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Country.GetAll.userCountries(), async (req: any, res: Response) => {
      try {
        const schmeName = await VersionService.getDatabaseSchema(req)
        const userRoles = (Request as any).getUserRoles(req)
        const result = await countryRepository.getAllowedCountries(userRoles, schmeName)
        res.json(result)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })

    express.get(ApiEndPoint.Country.GetAll.generalCountries(), async (req: any, res: Response) => {
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
