import { Request, Response } from 'express'
import Requests from '@server/utils/requests'
import { CountryIso } from '@meta/area'
import { AssessmentController } from '@server/controller/assessment'
import { CycleDataRepository } from '@server/repository/cycleData'

export const getOriginalDataPointData = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName } = <Record<string, string>>req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ name: assessmentName, cycleName })

    const table = await CycleDataRepository.getOriginalDataPointData({
      countryIso: countryIso as CountryIso,
      cycle,
      assessment,
    })
    Requests.send(res, table)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
