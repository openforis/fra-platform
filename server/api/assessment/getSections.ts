import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller/assessment'

export const AssessmentGetSections = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Assessment.sections(), async (req: Request, res: Response) => {
      const { assessmentName, cycleName } = req.params
      try {
        const sections = await AssessmentController.getSections({ name: assessmentName, cycleName })
        Requests.send(res, sections)
      } catch (e) {
        Requests.sendErr(res, e)
      }
    })
  },
}
