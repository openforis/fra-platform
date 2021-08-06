import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { OdpService } from '@server/service'
import { CountryIso } from '@core/country'
import { User } from '@core/auth'

export const OdpCreateDraft = {
  init: (express: Express): void => {
    express.post(
      ApiEndPoint.Odp.createDraft(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const { countryIso } = req.query
          const { user } = req
          const result = await OdpService.persistDraft({
            countryIso: countryIso as CountryIso,
            user: user as User,
            draft: req.body,
          })
          res.json(result)
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
