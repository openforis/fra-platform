import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import { allowedToEditDataCheck } from '@server/assessment/assessmentEditAccessControl'
import { OdpService } from '@server/service'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { User } from '@core/auth'

export const OdpDeleteDraft = {
  init: (express: Express): void => {
    express.delete(
      ApiEndPoint.Odp.deleteDraft(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const { countryIso } = req.query
          await allowedToEditDataCheck(countryIso, req.user, 'extentOfForest')

          const { odpId } = await OdpService.deleteDraft({ odpId: req.query.odpId as string, user: req.user as User })
          const odp = await OdpService.getOdp({ odpId })

          res.json({ odp })
        } catch (err) {
          Requests.sendErr(res, err)
        }
      }
    )
  },
}
