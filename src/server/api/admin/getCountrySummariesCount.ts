import { Response } from 'express'

import { TablePaginatedCountRequest } from 'meta/api/request/tablePaginated'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import Requests from 'server/utils/requests'

export const getCountrySummariesCount = async (req: TablePaginatedCountRequest, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const summariesCount = await AreaController.getCountrySummariesCount({ assessment, cycle })

    Requests.sendOk(res, summariesCount)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
