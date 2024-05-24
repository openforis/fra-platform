import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { TablePaginatedOrderByDirection } from 'meta/tablePaginated'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

type Request = CycleRequest & {
  approved?: boolean
  limit?: number
  offset?: number
  orderBy?: string
  orderByDirection?: TablePaginatedOrderByDirection
}

export const getManyLinks = async (req: Request, res: Response) => {
  try {
    const { approved, assessmentName, cycleName, limit, offset, orderBy, orderByDirection } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const props = { approved, assessment, cycle, limit, offset, orderBy, orderByDirection }
    const links = await CycleDataController.Link.getMany(props)

    Requests.send(res, links)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
