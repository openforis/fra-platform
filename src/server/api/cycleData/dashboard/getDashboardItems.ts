import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { DashboardController } from 'server/controller/cycleData/dashboard'
import Requests from 'server/utils/requests'

export const getDashboardItems = async (req: CycleRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const result = await DashboardController.getManyItems({ assessment, cycle, countryIso })
    Requests.send(res, result)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
