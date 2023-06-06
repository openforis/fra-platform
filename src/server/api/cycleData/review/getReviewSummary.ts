import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getReviewSummary = async (req: CycleRequest, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const user = Requests.getUser(req)
    const reviewSummary = await CycleDataController.getReviewSummary({ countryIso, assessment, cycle, user })

    Requests.send(res, reviewSummary)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
