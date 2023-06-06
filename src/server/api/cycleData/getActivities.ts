import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getActivities = async (req: CycleDataRequest, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const activities = await CycleDataController.getActivities({ countryIso, assessment, cycle })

    Requests.send(res, activities)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
