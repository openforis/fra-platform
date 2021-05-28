import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as auditRepository from '@server/repository/audit/auditRepository'
import { sendErr } from '@server/utils/requestUtils'

export const AuditGetFeed = {
  init: (express: Express): void => {
    express.get(
      '/audit/getAuditFeed/:countryIso',
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
