import { Express, Response, Request } from 'express'
import { ApiAuthMiddleware } from '@server/api/middleware'
import * as auditRepository from '@server/repository/audit/auditRepository'
import { sendErr } from '@server/utils/requestUtils'
import { ApiEndPoint } from '@common/api/endpoint'

export const AuditGetLatestLogTimestamp = {
  init: (express: Express): void => {
    express.get(
      ApiEndPoint.Audit.getLatestLogTimestamp(),
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
