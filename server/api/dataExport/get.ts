import { Express, Response, Request } from 'express'
import * as VersionService from '@server/versioning/service'
import * as DataExportRepository from '@server/dataExport/dataExportRepository'
import * as Requests from '../../utils/requestUtils'

const panEuropean = (assessmentType: any) => (assessmentType === 'panEuropean' ? 'pan_european' : null)

export const DataExportGet = {
  init: (express: Express): void => {
    express.get('/api/export/:assessmentType/:section', async (req: Request, res: Response) => {
      try {
        const { countries, columns, variables } = req.query
        const { assessmentType, section } = req.params
        const schemaName = panEuropean(assessmentType) || (await VersionService.getDatabaseSchema(req))
        const result = await DataExportRepository.getExportData(schemaName, section, variables, countries, columns)
        res.json(result)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
