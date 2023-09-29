import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const deleteOriginalDataPointNationalClass = async (
  req: CycleRequest<never, { id: string; index: number }>,
  res: Response
) => {
  try {
    const { assessmentName, cycleName, odpId: id, index } = req.query

    const metaCache = true
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName, metaCache })

    const propsDelete = { assessment, cycle, index, id, user: Requests.getUser(req) }
    const returnedOriginalDataPoint = await CycleDataController.deleteOriginalDataPointNationalClass(propsDelete)

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
