import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'

import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getInvitations = async (req: TablePaginatedDataRequest, res: Response): Promise<void> => {
  try {
    const { limit, offset, orderBy, orderByDirection } = req.query

    const { assessment, cycle } = req.context

    const props = { assessment, cycle, limit, offset, orderBy, orderByDirection }
    const invitations = await UserController.getManyInvitations(props)

    Requests.sendOk(res, invitations)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
