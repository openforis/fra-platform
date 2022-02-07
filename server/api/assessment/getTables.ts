import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller'
import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

export const AssessmentGetTables = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Assessment.Table.one(), async (req: Request, res: Response) => {
      try {
        const { countryIso, assessmentName, cycleName, section } = req.params
        const { tableNames } = req.query as { tableNames: Array<string> }

        const table = await AssessmentController.getTables({
          countryIso: countryIso as CountryIso,
          assessmentName: assessmentName as AssessmentName,
          cycleName,
          section,
          tableNames,
        })
        Requests.send(res, table)
      } catch (e) {
        Requests.sendErr(res, e)
      }
    })
  },
}
