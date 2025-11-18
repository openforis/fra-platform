import { Response } from 'express'

import { TablePaginatedCountRequest } from 'meta/api/request/tablePaginated'
import { InvitationFilters } from 'meta/tablePaginated/filters/invitations'
import { TablePaginateds } from 'meta/tablePaginated/tablePaginateds'

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
