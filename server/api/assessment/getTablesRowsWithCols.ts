import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller'
import { AssessmentName } from '@meta/assessment'

export const AssessmentGetTableRowsMetaData = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Assessment.TableRowsMetadata.many(), async (req: Request, res: Response) => {
      try {
        const { tableId, assessmentName } = req.params
        const rows = await AssessmentController.getManyRows({
          assessmentName: assessmentName as AssessmentName,
          tableId: Number(tableId),
        })
        Requests.send(res, rows)
      } catch (e) {
        Requests.sendErr(res, e)
      }
    })
  },
}
