import { CountryIso } from '@core/country'
import { Request, Response } from 'express'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import { Requests } from '@server/utils'

export const getReservedYears = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({
      name: String(assessmentName),
      cycleName: String(cycleName),
    })

    const years = await CycleDataController.getOriginalDataPointReservedYears({
      countryIso: countryIso as CountryIso,
      assessment,
      cycle,
    })
    Requests.send(res, { years })
  } catch (err) {
    Requests.sendErr(res, err)
  }
}
