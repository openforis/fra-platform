import { Request, Response } from 'express'

import { CountryIso } from '@meta/area'

import { AssessmentController } from '@server/controller/assessment'
import { DataRepository } from '@server/repository/assessmentCycle/data'
import Requests from '@server/utils/requests'

export const getOriginalDataPointData = async (req: Request, res: Response) => {
  try {
    const { countryIso, assessmentName, cycleName } = <Record<string, string>>req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const table = await DataRepository.getOriginalDataPointData({
      countryISOs: [countryIso as CountryIso],
      cycle,
      assessment,
    })
    Requests.send(res, table)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
