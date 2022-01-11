import { Express, Request, Response } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { sendErr } from '@server/utils/requests'
import { AssessmentController } from '@server/controller'

export const AssessmentGetSections = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.Assessment.sections(), async (req: Request, res: Response) => {
      const { name, cycleName } = req.params
      try {
        const sections = await AssessmentController.getSections({ name, cycleName })
        res.send(sections)
      } catch (e) {
        sendErr(res, e)
      }
    })
  },
}
