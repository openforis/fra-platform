import { Express, Response, Request } from 'express'
import { CountryService } from '@server/service'
import * as VersionService from '@server/service/versioning/service'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'

export const CountryGetAll = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Country.GetAll.userCountries(), async (req: Request, res: Response) => {
      try {
        const schmeName = await VersionService.getDatabaseSchema()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const userRoles = Requests.getUserRoles(req)
        const result = await CountryService.getAllowedCountries(userRoles, schmeName)
        res.json(result)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })

    express.get(ApiEndPoint.Country.GetAll.generalCountries(), async (_req: Request, res: Response) => {
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
