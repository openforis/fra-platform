import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const deleteOriginalDataPoint = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, year, countryIso } = req.params

    const originalDataPoint = await CycleDataController.getOriginalDataPoint({
      assessmentName,
      cycleName,
      year,
      countryIso: countryIso as CountryIso,
    })

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const returnedOriginalDataPoint = await CycleDataController.removeOriginalDataPoint({
      assessment,
      cycle,
      originalDataPoint,
      user: Requests.getRequestUser(req),
    })

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
