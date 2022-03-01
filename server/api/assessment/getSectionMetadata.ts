import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller'
import { AssessmentName } from '@meta/assessment'

export const AssessmentGetSectionMetadata = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Assessment.Sections.Metadata.many(), async (req: Request, res: Response) => {
      try {
        const { assessmentName, section, cycleName } = req.params

        const tablesMetadata = await AssessmentController.getSectionMetadata({
          cycleName,
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
