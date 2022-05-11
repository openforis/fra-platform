import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import Requests from '@server/utils/requests'

export const getReviewStatus = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName, section } = <Record<string, string>>req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const reviewstatus = await CycleDataController.getReviewStatus({
      assessment,
      cycle,
      countryIso: countryIso as CountryIso,
      section,
      user: Requests.getRequestUser(req),
    })

    Requests.send(res, reviewstatus)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
