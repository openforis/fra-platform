import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getActivities = async (req: TablePaginatedDataRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, countryIso, offset, limit } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const props = { assessment, cycle, countryIso, offset, limit }
    const activities = await CycleDataController.getActivities(props)

    Requests.send(res, activities)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
