import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'

import { AssessmentController } from '@server/controller/assessment'
import { Requests } from '@server/utils'

export const getOriginalDataPoints = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso } = req.params

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const originalDataPoints = await AssessmentController.getOriginalDataPoints({
      assessment,
      cycle,
      countryIso: countryIso as CountryIso,
    })

    Requests.send(res, originalDataPoints)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
