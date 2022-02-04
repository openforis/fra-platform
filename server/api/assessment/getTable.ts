import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller'
import { CountryIso } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

export const AssessmentGetTable = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Assessment.Table.one(), async (req: Request, res: Response) => {
      try {
        const { countryIso, assessmentName, cycleName, tableName } = req.params
        const table = await AssessmentController.getTable({
          countryIso: countryIso as CountryIso,
          assessmentName: assessmentName as AssessmentName,
          cycleName,
          tableName,
        })
        res.send(table)
      } catch (e) {
        Requests.sendErr(res, e)
      }
    })
  },
}
