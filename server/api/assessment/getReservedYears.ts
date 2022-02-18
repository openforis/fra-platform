import { Response, Request } from 'express'
import { Requests } from '@server/utils'
import { CountryIso } from '@core/country'
import { AssessmentController } from '@server/controller'
import { AssessmentName } from '@meta/assessment'

export const getReservedYears = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName } = req.query
    const years = await AssessmentController.getReservedYears({
      countryIso: countryIso as CountryIso,
      assessmentName: assessmentName as AssessmentName,
      cycleName: String(cycleName),
    })
    Requests.send(res, { years })
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
