import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const deleteOriginalDataPointNationalClass = async (
  req: CycleRequest<never, { id: string; index: number }>,
  res: Response
) => {
  try {
    const { assessmentName, cycleName, countryIso, odpId: id, index } = req.query
    const user = Requests.getUser(req)

    const metaCache = true
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName, metaCache })

    const propsDelete = { assessment, cycle, index, id, user }
    const returnedOriginalDataPoint = await CycleDataController.deleteOriginalDataPointNationalClass(propsDelete)
    await AreaController.updateCountryStatus({ assessment, cycle, countryIso, user })

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
