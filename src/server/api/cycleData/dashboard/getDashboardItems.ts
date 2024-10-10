import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { DashboardController } from 'server/controller/cycleData/dashboard'
import Requests from 'server/utils/requests'

type Query = { query: string; limit: string }

export const getDashboardItems = async (req: CycleRequest<Query>, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const result = await DashboardController.getManyItems({ assessment, cycle })
    Requests.send(res, result)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
