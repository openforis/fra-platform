import { Express, Response, Request } from 'express'

import { AssessmentType } from '@core/assessment'
import { ApiEndPoint } from '@common/api/endpoint'

import * as VersionService from '@server/service/versioning/service'
import { Requests } from '@server/utils'
import { DataTableService } from '@server/service'

export const DataTableRead = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.DataTable.get(), async (req: Request, res: Response) => {
      try {
        const {
          params: { assessmentType, countryIso, tableSpecName },
        } = req
        const schemaName =
          assessmentType === AssessmentType.panEuropean ? 'pan_european' : await VersionService.getDatabaseSchema(req)
        const result = await DataTableService.read(countryIso, tableSpecName, schemaName)
        res.json(result)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
