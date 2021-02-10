import * as db from '../db/db'
import { sendErr } from '../utils/requestUtils'
import * as repository from './growingStockRepository'
import * as Auth from '../auth/authApiMiddleware'

import * as VersionService from '../versioning/service'

import * as GrowingStockService from './growingStockService'

export const init = (app: any) => {
  app.get('/growingStock/:countryIso', async (req: any, res: any) => {
    try {
      const schemaName = await VersionService.getDatabaseSchema(req)
      const growingStock = await GrowingStockService.getGrowingStock(req.params.countryIso, schemaName)
      res.json(growingStock)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post('/growingStock/:countryIso', Auth.requireCountryEditPermission, async (req: any, res: any) => {
    try {
      await db.transaction(repository.persistBothGrowingStock, [req.user, req.params.countryIso, req.body])
      res.json({})
    } catch (err) {
      sendErr(res, err)
    }
  })
}
