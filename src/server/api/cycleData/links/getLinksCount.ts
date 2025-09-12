import { Response } from 'express'

import { TablePaginatedCountRequest } from 'meta/api/request/tablePaginated'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getLinksCount = async (req: TablePaginatedCountRequest, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context

    const linksCount = await CycleDataController.Links.getCount({ assessment, cycle })

    Requests.sendOk(res, linksCount)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
