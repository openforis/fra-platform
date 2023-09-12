import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getInvitations = async (req: TablePaginatedDataRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, limit, offset, orderBy, orderByDirection } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const props = { assessment, cycle, limit, offset, orderBy, orderByDirection }
    const invitations = await UserController.getManyInvitations(props)

    Requests.sendOk(res, invitations)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
