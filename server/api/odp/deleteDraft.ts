import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { allowedToEditDataCheck } from '@server/assessment/assessmentEditAccessControl'
import * as db from '@server/db/db'
import * as odpRepository from '@server/repository/odp/odpRepository'
import * as Requests from '@server/utils/requestUtils'
import { ApiEndPoint } from '@server/api/endpoint'

export const OdpDeleteDraft = {
  init: (express: Express): void => {
    express.delete(
      ApiEndPoint.Odp.deleteDraft,
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const { countryIso } = req.query
          await allowedToEditDataCheck(countryIso, req.user, 'extentOfForest')

          const { odpId } = await db.transaction(odpRepository.deleteDraft, [req.query.odpId, req.user])
          const odp = await odpRepository.getOdp(odpId)

          res.json({ odp })
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
