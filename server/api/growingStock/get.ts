import { Express, Response, Request } from 'express'
import * as VersionService from '@server/versioning/service'
import * as GrowingStockService from '@server/growingStock/growingStockService'
import { sendErr } from '@server/utils/requestUtils'

export const GrowingStockGet = {
  init: (express: Express): void => {
    express.get('/api/growingStock/:countryIso', async (req: Request, res: Response) => {
      try {
        const schemaName = await VersionService.getDatabaseSchema(req)
        const growingStock = await GrowingStockService.getGrowingStock(req.params.countryIso, schemaName)
        res.json(growingStock)
      } catch (err) {
        sendErr(res, err)
      }
    })
  },
}
