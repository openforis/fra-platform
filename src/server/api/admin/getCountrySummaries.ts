import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import Requests from 'server/utils/requests'

export const getCountrySummaries = async (req: TablePaginatedDataRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, limit, offset } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
    const countrySummaries = await AreaController.getCountrySummaries({ assessment, cycle, limit, offset })

    Requests.sendOk(res, countrySummaries)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
