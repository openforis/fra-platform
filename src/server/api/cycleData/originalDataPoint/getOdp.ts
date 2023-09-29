import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { Requests } from 'server/utils'

export const getOriginalDataPoint = async (req: CycleRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, year, countryIso } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const odp = await CycleDataController.getOriginalDataPoint({ assessment, cycle, year, countryIso })

    Requests.send(res, odp)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
