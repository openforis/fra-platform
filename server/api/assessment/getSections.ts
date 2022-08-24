import { Request, Response } from 'express'

import { AssessmentController } from '@server/controller/assessment'
import Requests from '@server/utils/requests'

export const getSections = async (req: Request, res: Response) => {
  const { assessmentName, cycleName } = req.params
  try {
    const sections = await AssessmentController.getSections({ assessmentName, cycleName })
    Requests.send(res, sections)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
