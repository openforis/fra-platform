import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller'
import { AssessmentName } from '@meta/assessment'

export const AssessmentGetTablesMetaData = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Assessment.TablesMetadata.many(), async (req: Request, res: Response) => {
      try {
        const { assessmentName, section } = req.params
        const tablesMetadata = await AssessmentController.getTablesMetadata({
          assessmentName: assessmentName as AssessmentName,
          section,
        })
        Requests.send(res, tablesMetadata)
      } catch (e) {
        Requests.sendErr(res, e)
      }
    })
  },
}
