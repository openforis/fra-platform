import { UsersRequest } from 'meta/api/request'
import { TablePaginateds } from 'meta/tablePaginated'
import { InvitationFilters } from 'meta/tablePaginated/tablePaginated'

import { InvitationsGetManyProps } from 'server/repository/public/userInvitation/invitationsGetManyProps'

export const getInvitationsGetManyPropsFromRequest = async (req: UsersRequest): Promise<InvitationsGetManyProps> => {
  const { filters: filtersReq, limit: limitReq, offset: offsetReq, orderBy, orderByDirection } = req.query

  const { assessment, cycle } = req.context

  const filters = TablePaginateds.decodeFilters<InvitationFilters>(filtersReq)
  const limit = limitReq && Number(limitReq)
  const offset = offsetReq && Number(offsetReq)

  return { assessment, cycle, filters, limit, offset, orderBy, orderByDirection }
}
