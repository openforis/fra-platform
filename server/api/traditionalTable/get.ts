import { Express, Response, Request } from 'express'
import * as Assessment from '@common/assessment/assessment'
import * as VersionService from '@server/service/versioning/service'
import * as repository from '@server/repository/traditionalTable/traditionalTableRepository'
import * as Requests from '@server/utils/requestUtils'
import { ApiEndPoint } from '@common/api/endpoint'

export const TraditionalTableGet = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.TraditionalTable.get(), async (req: Request, res: Response) => {
      try {
        const {
          params: { assessmentType, countryIso, tableSpecName },
        } = req
        const schemaName = Assessment.isTypePanEuropean(assessmentType)
          ? 'pan_european'
          : await VersionService.getDatabaseSchema(req)
        const result = await repository.read(countryIso, tableSpecName, schemaName)
        res.json(result)
      } catch (err) {
        Requests.sendErr(res, err)
      }
    })
  },
}
