import { UsersRequest } from 'meta/api/request'
import { TablePaginateds, UserFilters } from 'meta/tablePaginated'

import { UsersGetManyProps } from 'server/repository/public/user'

export const getUsersGetManyPropsFromRequest = async (req: UsersRequest): Promise<UsersGetManyProps> => {
  const { filters: filtersReq, limit: limitReq, offset: offsetReq, orderBy, orderByDirection } = req.query

  const { assessment, cycle } = req.context

  const filters = TablePaginateds.decodeFilters<UserFilters>(filtersReq)
  const limit = limitReq && Number(limitReq)
  const offset = offsetReq && Number(offsetReq)

  return { assessment, cycle, filters, limit, offset, orderBy, orderByDirection }
}
