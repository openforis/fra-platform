import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { OriginalDataPoint } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const updateOriginalDataPointDescription = async (
  req: CycleRequest<never, { originalDataPoint: OriginalDataPoint }>,
  res: Response
) => {
  try {
    const { assessmentName, cycleName } = req.query
    const { originalDataPoint } = req.body

    const metaCache = true
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName, metaCache })

    const propsUpdate = { assessment, cycle, originalDataPoint, user: Requests.getUser(req) }
    const returnedOriginalDataPoint = await CycleDataController.updateOriginalDataPointDescription(propsUpdate)

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
