import { CountryIso } from '@core/country'
import { Response } from 'express'

import { CycleRequest } from '@meta/api/request'

import { AssessmentController } from '@server/controller/assessment'
import { CycleDataController } from '@server/controller/cycleData'
import { Requests } from '@server/utils'

export const getReservedYears = async (req: CycleRequest, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

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
