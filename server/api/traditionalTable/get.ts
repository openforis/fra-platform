import { Express, Response, Request } from 'express'
import * as Assessment from '@common/assessment/assessment'
import * as VersionService from '@server/versioning/service'
import * as repository from '@server/traditionalTable/traditionalTableRepository'
import * as Requests from '@server/utils/requestUtils'

export const TraditionalTableGet = {
  init: (express: Express): void => {
    express.get(
      '/api/traditionalTable/:assessmentType/:countryIso/:tableSpecName',
      async (req: Request, res: Response) => {
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
      }
    )
  },
}
