import { UsersRequest } from 'meta/api/request'
import { TablePaginateds, UserFilters } from 'meta/tablePaginated'

import { AssessmentController } from 'server/controller/assessment'
import { UsersGetManyProps } from 'server/repository/public/user'

export const getUsersGetManyPropsFromRequest = async (req: UsersRequest): Promise<UsersGetManyProps> => {
  const {
    assessmentName,
    cycleName,
    filters: filtersReq,
    limit: limitReq,
    offset: offsetReq,
    orderBy,
    orderByDirection,
  } = req.query

  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

  const filters = TablePaginateds.decodeFilters<UserFilters>(filtersReq)
  const limit = limitReq && Number(limitReq)
  const offset = offsetReq && Number(offsetReq)

  return { assessment, cycle, filters, limit, offset, orderBy, orderByDirection }
}
