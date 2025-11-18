import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'
import { InvitationFilters } from 'meta/tablePaginated/filters/invitations'
import { TablePaginateds } from 'meta/tablePaginated/tablePaginateds/tablePaginateds'

import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getInvitations = async (req: TablePaginatedDataRequest, res: Response): Promise<void> => {
  try {
    const { filters: filtersReq, limit: limitReq, offset: offsetReq, orderBy, orderByDirection } = req.query

    const filters = TablePaginateds.decodeFilters<InvitationFilters>(filtersReq)
    const limit = limitReq && Number(limitReq)
    const offset = offsetReq && Number(offsetReq)

    const { assessment, cycle } = req.context
    const props = { assessment, cycle, filters, limit, offset, orderBy, orderByDirection }
    const invitations = await UserController.getManyInvitations(props)

    Requests.sendOk(res, invitations)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
