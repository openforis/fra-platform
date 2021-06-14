import { Express, Response, Request } from 'express'
import * as VersionService from '@server/service/versioning/service'
import * as DataExportRepository from '@server/repository/dataExport/dataExportRepository'
import { ApiEndPoint } from '@common/api/endpoint'
import { Requests } from '@server/utils'

const panEuropean = (assessmentType: any) => (assessmentType === 'panEuropean' ? 'pan_european' : null)

export const DataExportGet = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.DataExport.get(), async (req: Request, res: Response) => {
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
