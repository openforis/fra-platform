import { Express, Response, Request } from 'express'
import * as Requests from '@server/utils/requestUtils'
import * as VersionService from '@server/service/versioning/service'
import { ApiEndPoint } from '@server/api/endpoint'
import * as CountryService from '../../service/country/countryService'

export const CountryGetConfig = {
  init: (express: Express): void => {
    // Returns country config for :countryIso
    express.get(ApiEndPoint.Country.getConfig, async (req: Request, res: Response) => {
      try {
        const schemaName = await VersionService.getDatabaseSchema(req)
        const fullConfig = await CountryService.getCountryConfigFull(req.params.countryIso, schemaName)
        res.json(fullConfig)
      } catch (e) {
        Requests.sendErr(res, e)
      }
    })
  },
}
