import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const updateOriginalDataPointYear = async (
  req: CycleRequest<never, { id: string; year: string; targetYear: string }>,
  res: Response
) => {
  try {
    const { assessmentName, cycleName, countryIso, sectionName } = req.query
    const { id, targetYear, year } = req.body

    const metaCache = true
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName, metaCache })

    const user = Requests.getUser(req)
    const propsUpdate = { assessment, cycle, sectionName, countryIso, id, year, targetYear, user }

    const returnedOriginalDataPoint = await CycleDataController.updateOriginalDataPointYear(propsUpdate)

    await AreaController.updateCountryStatus({ assessment, cycle, countryIso, user })

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
