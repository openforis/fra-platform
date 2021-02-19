import * as db from '../db/db'
import { sendErr, sendOk } from '../utils/requestUtils'
import * as repository from './descriptionsRepository'
import * as auditRepository from '../audit/auditRepository'

import * as Auth from '../auth/authApiMiddleware'
import * as VersionService from '../versioning/service'

export const init = (app: any) => {
  app.get('/country/descriptions/:countryIso/:section/:name', async (req: any, res: any) => {
    try {
      const schemaName = await VersionService.getDatabaseSchema(req)
      const result = await db.transaction(repository.readDescriptions, [
        req.params.countryIso,
        req.params.section,
        req.params.name,
        schemaName,
      ])

      res.json(result)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post(
    '/country/descriptions/:countryIso/:section/:name',
    Auth.requireCountryEditPermission,
    async (req: any, res: any) => {
      const { countryIso, section, name } = req.params
      const { content } = req.body
      try {
        await db.transaction(auditRepository.insertAudit, [req.user.id, 'saveDescriptions', countryIso, section])
        await db.transaction(repository.persistDescriptions, [countryIso, section, name, content])

        sendOk(res)
      } catch (err) {
        sendErr(res, err)
      }
    }
  )
}
