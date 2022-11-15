import { Response } from 'express'

import { CycleRequest } from '@meta/api/request'

import { AreaController } from '@server/controller/area'
import { AssessmentController } from '@server/controller/assessment'
import Requests from '@server/utils/requests'

export const getCountries = async (req: CycleRequest, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const countries = await AreaController.getCountries({ assessment, cycle })

    Requests.sendOk(res, countries)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
