import { Response } from 'express'

import { TablePaginatedCountRequest } from 'meta/api/request/tablePaginated'

import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getInvitationsCount = async (req: TablePaginatedCountRequest, res: Response): Promise<void> => {
  try {
    const { assessment, cycle } = req.context

    const invitationsCount = await UserController.getCountInvitations({ assessment, cycle })

    Requests.sendOk(res, invitationsCount)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
