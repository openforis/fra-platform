import { Express, Response, Request } from 'express'
import { CountryService } from '@server/service'
import * as VersionService from '@server/service/versioning/service'
import * as Requests from '@server/utils/requestUtils'
import { CountryRepository } from '@server/repository'
import { ApiEndPoint } from '@server/api/endpoint'

export const CountryGetAll = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Country.GetAll.userCountries, async (req: Request, res: Response) => {
      try {
        const schmeName = await VersionService.getDatabaseSchema(req)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const userRoles = Requests.getUserRoles(req)
        const result = await CountryRepository.getAllowedCountries(userRoles, schmeName)
        res.json(result)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })

    express.get(ApiEndPoint.Country.GetAll.generalCountries, async (req: Request, res: Response) => {
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
