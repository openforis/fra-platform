import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const deleteOriginalDataPoint = async (req: CycleRequest<{ year: string }>, res: Response) => {
  try {
    const { assessmentName, cycleName, year, countryIso } = req.query

    const metaCache = true
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName, metaCache })
    const originalDataPoint = await CycleDataController.getOriginalDataPoint({ assessment, cycle, year, countryIso })

    const user = Requests.getUser(req)
    const propsRemove = { assessment, cycle, originalDataPoint, user }
    const returnedOriginalDataPoint = await CycleDataController.removeOriginalDataPoint(propsRemove)

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
