import { Response } from 'express'

import { CycleDataRequest } from 'meta/api/request'
import { OriginalDataPoint } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const createOriginalDataPoint = async (
  req: CycleDataRequest<never, { originalDataPoint: OriginalDataPoint }>,
  res: Response
) => {
  try {
    const { assessmentName, cycleName, sectionName } = req.query
    const { originalDataPoint } = req.body

    if (!originalDataPoint.year) {
      throw new Error(`odpMissingYear`)
    }

    const metaCache = true
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName, metaCache })

    const propsCreate = { assessment, cycle, originalDataPoint, sectionName, user: Requests.getUser(req) }
    const returnedOriginalDataPoint = await CycleDataController.createOriginalDataPoint(propsCreate)

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
