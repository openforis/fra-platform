// Changes one key/value pair
import { ApiAuthMiddleware } from '@server/api/middleware'
import { Express, Request, Response } from 'express'
import * as countryRepository from '@server/repository/country/countryRepository'
import * as Requests from '@server/utils/requestUtils'
import * as db from '@server/db/db'
import { ApiEndPoint } from '@server/api/endpoint'

export const CountryUpdateConfig = {
  init: (express: Express): void => {
    // Returns country config for :countryIso
    express.post(
      ApiEndPoint.Country.updateConfig,
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          await db.transaction(countryRepository.saveDynamicConfigurationVariable, [
            req.params.countryIso,
            req.body.key,
            req.body.value,
          ])
          res.json({})
        } catch (e) {
          Requests.sendErr(res, e)
        }
      }
    )
  },
}
