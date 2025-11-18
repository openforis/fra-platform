import { Response } from 'express'

import { UsersRequest } from 'meta/api/request'
import { UserFilters } from 'meta/tablePaginated/filters/users'
import { TablePaginateds } from 'meta/tablePaginated/tablePaginateds'

import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getUsersCount = async (req: UsersRequest, res: Response): Promise<void> => {
  try {
    const { filters: filtersReq } = req.query

    const { assessment, cycle } = req.context

    const filters = TablePaginateds.decodeFilters<UserFilters>(filtersReq)
    const count = await UserController.count({ assessment, cycle, filters })

    Requests.sendOk(res, count)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
