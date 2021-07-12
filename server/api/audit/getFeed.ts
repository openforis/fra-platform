import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as auditRepository from '@server/repository/audit/auditRepository'
import { sendErr } from '@server/utils/requests'
import { ApiEndPoint } from '@common/api/endpoint'

export const AuditGetFeed = {
  init: (express: Express): void => {
    express.get(
      ApiEndPoint.Audit.getFeed(),
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const feed = await auditRepository.getAuditFeed(req.params.countryIso)

          res.json({ feed })
        } catch (err) {
          sendErr(res, err)
        }
      }
    )
  },
}
