import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const getReviewSummary = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName } = <Record<string, string>>req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const reviewSummary = await CycleDataController.getReviewSummary({
      countryIso: countryIso as CountryIso,
      assessment,
      cycle,
      user: Requests.getRequestUser(req),
    })

    Requests.send(res, reviewSummary)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
