import { ApiAuthMiddleware } from '@server/api/middleware'
import * as db from '../db/db'
import * as repository from './traditionalTableRepository'
import { sendErr, sendOk } from '../utils/requestUtils'

import * as VersionService from '../versioning/service'

import * as Assessment from '../../common/assessment/assessment'

export const init = (app: any) => {
  app.post(
    '/traditionalTable/:countryIso/:tableSpecName',
    ApiAuthMiddleware.requireCountryEditPermission,
    async (req: any, res: any) => {
      try {
        const {
          user,
          body,
          params: { countryIso, tableSpecName },
        } = req

        await db.transaction(repository.save, [user, countryIso, tableSpecName, body])

        sendOk(res)
      } catch (err) {
        sendErr(res, err)
      }
    }
  )

  app.get('/traditionalTable/:assessmentType/:countryIso/:tableSpecName', async (req: any, res: any) => {
    try {
      const {
        params: { assessmentType, countryIso, tableSpecName },
      } = req
      const schemaName = Assessment.isTypePanEuropean(assessmentType)
        ? 'pan_european'
        : await VersionService.getDatabaseSchema(req)
      const result = await repository.read(countryIso, tableSpecName, schemaName)
      res.json(result)
    } catch (err) {
      sendErr(res, err)
    }
  })
}
