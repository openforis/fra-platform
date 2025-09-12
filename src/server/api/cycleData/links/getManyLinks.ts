import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CycleRequest & {
  approved?: boolean
  limit?: number
  offset?: number
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}

export const getManyLinks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { approved, limit, offset, orderBy, orderByDirection } = req.query
    const { assessment, cycle } = req.context

    const props = { approved, assessment, cycle, limit, offset, orderBy, orderByDirection }
    const links = await CycleDataController.Links.getMany(props)

    Requests.send(res, links)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
