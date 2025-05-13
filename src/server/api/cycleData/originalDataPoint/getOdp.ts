import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { Requests } from 'server/utils'

export const getOriginalDataPoint = async (req: CycleDataRequest<{ year: string }>, res: Response) => {
  try {
    const { assessmentName, countryIso, cycleName, year } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const odp = await CycleDataController.getOriginalDataPoint({ assessment, cycle, year, countryIso })

    Requests.send(res, odp)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
