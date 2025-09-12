import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getActivities = async (req: TablePaginatedDataRequest, res: Response): Promise<void> => {
  try {
    const { countryIso, limit, offset } = req.query
    const { assessment, cycle } = req.context

    const props = { assessment, cycle, countryIso, offset, limit }
    const activities = await CycleDataController.getActivities(props)

    Requests.send(res, activities)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
