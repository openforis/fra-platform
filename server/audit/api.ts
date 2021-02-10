import * as auditRepository from './auditRepository'
import { sendErr } from '../utils/requestUtils'

import * as Auth from '../auth/authApiMiddleware'

export const init = (app: any) => {
  app.get(
    '/audit/getLatestAuditLogTimestamp/:countryIso',
    Auth.requireCountryEditPermission,
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

  app.get('/audit/getAuditFeed/:countryIso', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      const feed = await auditRepository.getAuditFeed(req.params.countryIso)

      res.json({ feed })
    } catch (err) {
      sendErr(res, err)
    }
  })
}
