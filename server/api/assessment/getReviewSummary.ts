import { Request, Response } from 'express'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const getReviewSummary = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName } = <Record<string, string>>req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const reviewSummary = await CycleDataController.getReviewSummary({
      assessment,
      cycle,
      user: Requests.getRequestUser(req),
    })

    Requests.send(res, reviewSummary)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
