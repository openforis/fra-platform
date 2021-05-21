import { ApiAuthMiddleware } from '@server/api/middleware'
import * as auditRepository from './auditRepository'
import { sendErr } from '../utils/requestUtils'

export const init = (app: any) => {
  app.get(
    '/audit/getLatestAuditLogTimestamp/:countryIso',
    ApiAuthMiddleware.requireCountryEditPermission,
    async (req: any, res: any) => {
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

  app.get(
    '/audit/getAuditFeed/:countryIso',
    ApiAuthMiddleware.requireCountryEditPermission,
    async (req: any, res: any) => {
      try {
        const feed = await auditRepository.getAuditFeed(req.params.countryIso)

        res.json({ feed })
      } catch (err) {
        sendErr(res, err)
      }
    }
  )
}
