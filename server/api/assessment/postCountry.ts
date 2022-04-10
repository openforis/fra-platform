import { Request, Response } from 'express'

import Requests from '@server/utils/requests'
import { Country, CountryIso } from '@meta/area'
import { AssessmentController } from '@server/controller/assessment'

export const postCountry = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName } = <Record<string, string>>req.query
    const { country } = <{ country: Country }>req.body
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const updatedCountry = await AssessmentController.updateCountry({
      countryIso: countryIso as CountryIso,
      cycle,
      assessment,
      country,
      user: Requests.getRequestUser(req),
    })

    Requests.send(res, updatedCountry)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
