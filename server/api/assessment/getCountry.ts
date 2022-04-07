import { Request, Response } from 'express'

import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller/assessment'
import { CountryIso } from '@meta/area'

export const getCountry = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName } = <Record<string, string>>req.query
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })
    const country = await AssessmentController.getCountry({
      countryIso: countryIso as CountryIso,
      assessment,
      cycle,
    })

    Requests.send(res, country)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
