import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { OriginalDataPoint } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const updateOriginalDataPointNationalClasses = async (
  req: CycleRequest<never, { originalDataPoint: OriginalDataPoint }>,
  res: Response
) => {
  try {
    const { assessmentName, cycleName } = req.query
    const { originalDataPoint } = req.body

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName,
      cycleName,
      metaCache: true,
    })

    const returnedOriginalDataPoint = await CycleDataController.updateOriginalDataPointNationalClasses({
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
