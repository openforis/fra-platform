import { Express, Response, Request } from 'express'
import * as Assessment from '@common/assessment/assessment'
import * as VersionService from '@server/service/versioning/service'
import { Requests } from '@server/utils'
import { ApiEndPoint } from '@common/api/endpoint'
import { DataTableService } from '@server/service'

export const DataTableRead = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.DataTable.get(), async (req: Request, res: Response) => {
      try {
        const {
          params: { assessmentType, countryIso, tableSpecName },
        } = req
        const schemaName = Assessment.isTypePanEuropean(assessmentType)
          ? 'pan_european'
          : await VersionService.getDatabaseSchema(req)
        const result = await DataTableService.read(countryIso, tableSpecName, schemaName)
        res.json(result)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
