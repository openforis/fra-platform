import { Express, Response, Request } from 'express'
import * as Requests from '@server/utils/requestUtils'
import * as VersionService from '@server/versioning/service'
import * as CountryService from '../../country/countryService'

export const CountryGetConfig = {
  init: (express: Express): void => {
    // Returns country config for :countryIso
    express.get('/api/country/config/:countryIso', async (req: Request, res: Response) => {
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
