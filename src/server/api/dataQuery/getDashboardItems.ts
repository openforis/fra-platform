import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { DataQueryController } from 'server/controller/dataQuery'
import Requests from 'server/utils/requests'

type Query = { query: string; limit: string }

export const getDashboardItems = async (req: CycleRequest<Query>, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const result = await DataQueryController.getMany({ assessment, cycle })
    Requests.send(res, result)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
