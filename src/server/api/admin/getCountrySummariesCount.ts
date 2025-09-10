import { Response } from 'express'

import { TablePaginatedCountRequest } from 'meta/api/request/tablePaginated'

import { AreaController } from 'server/controller/area'
import Requests from 'server/utils/requests'

export const getCountrySummariesCount = async (req: TablePaginatedCountRequest, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context
    const summariesCount = await AreaController.getCountrySummariesCount({ assessment, cycle })

    Requests.sendOk(res, summariesCount)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
