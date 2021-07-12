import { Express, Response, Request } from 'express'
import * as VersionService from '@server/service/versioning/service'
import * as GrowingStockService from '@server/service/growingStock/growingStockService'
import { sendErr } from '@server/utils/requests'
import { ApiEndPoint } from '@common/api/endpoint'

export const GrowingStockGet = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.GrowingStock.get(), async (req: Request, res: Response) => {
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
