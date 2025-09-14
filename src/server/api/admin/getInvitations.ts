import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'

import { getInvitationsGetManyPropsFromRequest } from 'server/api/admin/_getInvitationsGetManyPropsFromRequest'
import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getInvitations = async (req: TablePaginatedDataRequest, res: Response): Promise<void> => {
  try {
    const props = await getInvitationsGetManyPropsFromRequest(req)

    const invitations = await UserController.getManyInvitations(props)

    Requests.sendOk(res, invitations)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
