import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '@server/db/db'
import * as odpRepository from '@server/repository/odp/odpRepository'
import * as Requests from '@server/utils/requestUtils'
import { ApiEndPoint } from '@server/api/endpoint'

export const OdpCreateDraft = {
  init: (express: Express): void => {
    express.post(
      ApiEndPoint.Odp.createDraft,
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const { countryIso } = req.query
          const result = await db.transaction(odpRepository.saveDraft, [countryIso, req.user, req.body])
          res.json(result)
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
