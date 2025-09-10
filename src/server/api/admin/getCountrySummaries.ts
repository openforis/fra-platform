import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'

import { AreaController } from 'server/controller/area'
import Requests from 'server/utils/requests'

export const getCountrySummaries = async (req: TablePaginatedDataRequest, res: Response): Promise<void> => {
  try {
    const { limit, offset, orderBy, orderByDirection } = req.query

    const { assessment, cycle } = req.context

    const props = { assessment, cycle, limit, offset, orderBy, orderByDirection }
    const countrySummaries = await AreaController.getCountrySummaries(props)

    Requests.sendOk(res, countrySummaries)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
