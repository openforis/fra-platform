import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'

import { HistoryController } from 'server/controller/cycleData/history'
import Requests from 'server/utils/requests'

export const getHistoryCount = async (req: TablePaginatedDataRequest, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const { countryIso, sectionName } = req.query
    const { target } = req.params

    const props = { assessment, cycle, countryIso, sectionName, target }
    const count = await HistoryController.Activities.getCount(props)

    Requests.send(res, count)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
