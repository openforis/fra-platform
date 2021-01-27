import { getStatisticalFactsheetData } from './service'

import * as VersionService from '../versioning/service'

export const init = (app: any) => {
  app.get('/statisticalFactsheets/', async (req: any, res: any) => {
    const schemaName = await VersionService.getDatabaseSchema(req)
    const {
      query: { rowNames, level },
    } = req
    const statisticalFactsheetData = await getStatisticalFactsheetData(schemaName, level, rowNames)
    res.json(statisticalFactsheetData)
  })
}
