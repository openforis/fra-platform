import { Express, Response, Request } from 'express'

import { AssessmentType } from '@core/assessment'
import { ApiEndPoint } from '@common/api/endpoint'

import * as VersionService from '@server/controller/versioning/service'
import { Requests } from '@server/utils'
import { DataTableService } from '@server/controller'
import { CountryIso } from '@core/country'

export const DataTableRead = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.DataTable.get(), async (req: Request, res: Response) => {
      try {
        const {
          params: { assessmentType, countryIso, tableSpecName },
        } = req
        const schemaName =
          assessmentType === AssessmentType.panEuropean ? 'pan_european' : await VersionService.getDatabaseSchema()

        const result = await DataTableService.read({ countryIso: countryIso as CountryIso, tableSpecName, schemaName })

        res.json(result)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
