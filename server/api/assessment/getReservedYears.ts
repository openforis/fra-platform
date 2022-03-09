import { Response, Request } from 'express'
import { Requests } from '@server/utils'
import { CountryIso } from '@core/country'
import { AssessmentController } from '@server/controller/assessment'

export const getReservedYears = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      name: String(assessmentName),
      cycleName: String(cycleName),
    })

    const years = await AssessmentController.getReservedYears({
      countryIso: countryIso as CountryIso,
      assessment,
      cycle,
    })
    Requests.send(res, { years })
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
