// Changes one key/value pair
import { ApiAuthMiddleware } from '@server/api/middleware'
import { Express, Request, Response } from 'express'
import { CountryRepository } from '@server/repository'
import { Requests } from '@server/utils'
import * as db from '@server/db/db_deprecated'
import { ApiEndPoint } from '@common/api/endpoint'

export const CountryUpdateConfig = {
  init: (express: Express): void => {
    // Returns country config for :countryIso
    express.post(
      ApiEndPoint.Country.updateConfig(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          await db.transaction(CountryRepository.saveDynamicConfigurationVariable, [
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
