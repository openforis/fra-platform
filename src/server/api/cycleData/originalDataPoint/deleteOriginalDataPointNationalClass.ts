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

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      assessmentName,
      cycleName,
      metaCache: true,
    })

    const returnedOriginalDataPoint = await CycleDataController.deleteOriginalDataPointNationalClass({
      assessment,
      cycle,
      index,
      id,
      user: Requests.getUser(req),
    })

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
