import { Response } from 'express'

import { TablePaginatedCountRequest } from 'meta/api/request/tablePaginated'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getLinksCount = async (req: TablePaginatedCountRequest, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const linksCount = await CycleDataController.Links.getCount({ assessment, cycle })

    Requests.sendOk(res, linksCount)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
