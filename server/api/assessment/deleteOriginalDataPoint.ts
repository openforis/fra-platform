import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller/assessment'
import { CountryIso } from '@meta/area'

export const deleteOriginalDataPoint = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, year, countryIso } = req.params

    const originalDataPoint = await AssessmentController.getOriginalDataPoint({
      name: assessmentName,
      cycleName,
      year,
      countryIso: countryIso as CountryIso,
    })
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const returnedOriginalDataPoint = await AssessmentController.removeOriginalDataPoint({
      assessment,
      assessmentCycle: cycle,
      originalDataPoint,
      user: Requests.getRequestUser(req),
    })

    Requests.send(res, returnedOriginalDataPoint)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
