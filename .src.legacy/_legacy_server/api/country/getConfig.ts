import { Express, Response, Request } from 'express'
import { Requests } from '@server/utils'
import * as VersionService from '@server/controller/versioning/service'
import { ApiEndPoint } from '@common/api/endpoint'
import { CountryService } from '@server/controller'
import { CountryIso } from '@core/country'

export const CountryGetConfig = {
  init: (express: Express): void => {
    // Returns country config for :countryIso
    express.get(ApiEndPoint.Country.getConfig(), async (req: Request, res: Response) => {
      try {
        const schemaName = await VersionService.getDatabaseSchema()
        const fullConfig = await CountryService.getCountryConfigFull(req.params.countryIso as CountryIso, schemaName)
        res.json(fullConfig)
      } catch (e) {
        Requests.sendErr(res, e)
      }
    })
  },
}
