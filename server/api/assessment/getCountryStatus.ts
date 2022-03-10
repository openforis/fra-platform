import { Request, Response } from 'express'

import Requests from '@server/utils/requests'
import { AssessmentController } from '@server/controller/assessment'
import { AssessmentName } from '@meta/assessment'

export const getCountryStatus = async (req: Request, res: Response) => {
  const { countryIso, name, cycleName } = req.params
  try {
    const countryStatus = await AssessmentController.getCountryStatus({
      countryIso,
      name: name as AssessmentName,
      cycleName,
    })
    Requests.send(res, countryStatus)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
