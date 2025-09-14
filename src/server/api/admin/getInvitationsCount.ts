import { Response } from 'express'

import { TablePaginatedCountRequest } from 'meta/api/request/tablePaginated'
import { InvitationFilters, TablePaginateds } from 'meta/tablePaginated'

import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getInvitationsCount = async (req: TablePaginatedCountRequest, res: Response): Promise<void> => {
  try {
    const { filters: filtersReq } = req.query
    const { assessment, cycle } = req.context

    const filters = TablePaginateds.decodeFilters<InvitationFilters>(filtersReq)

    const invitationsCount = await UserController.getCountInvitations({ assessment, cycle, filters })

    Requests.sendOk(res, invitationsCount)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
