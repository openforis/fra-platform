import { Express, Response, Request } from 'express'
import * as VersionService from '@server/service/versioning/service'
import { getStatisticalFactsheetData } from '@server/service/statisticalFactsheets/service'
import { ApiEndPoint } from '@common/api/endpoint'

export const StatisticalFactsheetsGet = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.StatisticalFactsheets.get(), async (req: Request, res: Response) => {
      const schemaName = await VersionService.getDatabaseSchema()
      const {
        query: { rowNames, level },
      } = req
      const statisticalFactsheetData = await getStatisticalFactsheetData(schemaName, level, rowNames)
      res.json(statisticalFactsheetData)
    })
  },
}
