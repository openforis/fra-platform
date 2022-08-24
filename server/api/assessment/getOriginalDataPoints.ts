import { Request, Response } from 'express'

import { CycleDataParams } from '@meta/api/request'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import { Requests } from '@server/utils'

export const getOriginalDataPoints = async (req: Request<CycleDataParams>, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso } = req.params

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const originalDataPoints = await CycleDataController.getOriginalDataPoints({ assessment, cycle, countryIso })

    Requests.send(res, originalDataPoints)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
