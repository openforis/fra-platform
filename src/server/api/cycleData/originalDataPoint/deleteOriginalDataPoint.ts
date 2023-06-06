import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const deleteOriginalDataPoint = async (req: CycleRequest<{ year: string }>, res: Response) => {
  try {
    const { assessmentName, cycleName, year, countryIso } = req.query

    const originalDataPoint = await CycleDataController.getOriginalDataPoint({
      assessmentName,
      cycleName,
      year,
      countryIso,
    })

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName,
      cycleName,
      metaCache: true,
    })

    const returnedOriginalDataPoint = await CycleDataController.removeOriginalDataPoint({
      assessment,
      cycle,
      originalDataPoint,
      user: Requests.getUser(req),
    })

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
