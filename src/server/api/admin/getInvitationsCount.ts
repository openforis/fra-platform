import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'

import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getInvitationsCount = async (_req: TablePaginatedDataRequest, res: Response) => {
  try {
    const invitationsCount = await UserController.getCountInvitations()

    Requests.sendOk(res, invitationsCount)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
