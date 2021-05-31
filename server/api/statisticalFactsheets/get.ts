import { Express, Response, Request } from 'express'
import * as VersionService from '@server/service/versioning/service'
import { getStatisticalFactsheetData } from '@server/service/statisticalFactsheets/service'

export const StatisticalFactsheetsGet = {
  init: (express: Express): void => {
    express.get('/api/statisticalFactsheets/', async (req: Request, res: Response) => {
      const schemaName = await VersionService.getDatabaseSchema(req)
      const {
        query: { rowNames, level },
      } = req
      const statisticalFactsheetData = await getStatisticalFactsheetData(schemaName, level, rowNames)
      res.json(statisticalFactsheetData)
    })
  },
}
