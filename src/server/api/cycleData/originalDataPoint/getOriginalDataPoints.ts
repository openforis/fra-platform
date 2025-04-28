import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { Requests } from 'server/utils'

export const getOriginalDataPoints = async (req: CycleRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const originalDataPoints = await CycleDataController.getOriginalDataPoints({ assessment, cycle, countryIso })

    Requests.send(res, originalDataPoints)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
