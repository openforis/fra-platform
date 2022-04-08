import { Request, Response } from 'express'
import { AssessmentController } from '@server/controller/assessment'
import { Requests } from '@server/utils'
import { CountryIso } from '@meta/area'

export const getOriginalDataPoint = async (req: Request, res: Response) => {
  try {
    const { assessmentName, cycleName, year, countryIso } = req.params
    const odp = await AssessmentController.getOriginalDataPoint({
      name: assessmentName,
      cycleName,
      year,
      countryIso: countryIso as CountryIso,
    })
    Requests.send(res, odp)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
