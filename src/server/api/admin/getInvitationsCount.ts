import { Response } from 'express'

import { TablePaginatedCountRequest } from 'meta/api/request/tablePaginated'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getInvitationsCount = async (req: TablePaginatedCountRequest, res: Response) => {
  try {
    const { assessmentName, cycleName } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const invitationsCount = await UserController.getCountInvitations({ assessment, cycle })

    Requests.sendOk(res, invitationsCount)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
