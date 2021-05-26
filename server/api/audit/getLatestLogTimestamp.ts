import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as auditRepository from '@server/audit/auditRepository'
import { sendErr } from '@server/utils/requestUtils'

export const AuditGetLatestLogTimestamp = {
  init: (express: Express): void => {
    express.get(
      '/api/audit/getLatestAuditLogTimestamp/:countryIso',
      ApiAuthMiddleware.requireCountryEditPermission,
      async (req: Request, res: Response) => {
        try {
          const timeStamp = await auditRepository.getLastAuditTimeStampForSection(
            req.params.countryIso,
            req.query.section
          )

          res.json({ timeStamp })
        } catch (err) {
          sendErr(res, err)
        }
      }
    )
  },
}
