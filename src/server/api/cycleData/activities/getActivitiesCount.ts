import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getActivitiesCount = async (req: CycleDataRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const activitiesCount = await CycleDataController.getActivitiesCount({ assessment, cycle, countryIso })

    Requests.sendOk(res, activitiesCount)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
