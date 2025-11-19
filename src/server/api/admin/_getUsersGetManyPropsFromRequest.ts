import { AdminUsersRequest } from 'meta/api/request/admin/users'
import { UserFilters } from 'meta/tablePaginated/filters/users'
import { TablePaginateds } from 'meta/tablePaginated/tablePaginateds'

import { UsersGetManyProps } from 'server/db/repository/public/user'

export const getUsersGetManyPropsFromRequest = async (req: AdminUsersRequest): Promise<UsersGetManyProps> => {
  const { filters: filtersReq, limit: limitReq, offset: offsetReq, orderBy, orderByDirection } = req.query

  const { assessment, cycle } = req.context

  const filters = TablePaginateds.decodeFilters<UserFilters>(filtersReq)
  const limit = limitReq && Number(limitReq)
  const offset = offsetReq && Number(offsetReq)

  return { assessment, cycle, filters, limit, offset, orderBy, orderByDirection }
}
