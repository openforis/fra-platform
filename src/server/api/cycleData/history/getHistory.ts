import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'

import { HistoryController } from 'server/controller/cycleData/history'
import Requests from 'server/utils/requests'

export const getHistory = async (req: TablePaginatedDataRequest, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { countryIso, limit, offset, sectionName } = req.query
    const { target } = req.params

    const props = { assessment, cycle, countryIso, sectionName, target, limit, offset }
    const history = await HistoryController.Activities.getHistoryActivities(props)

    Requests.send(res, history)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
