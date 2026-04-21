import { Response } from 'express'

import { TablePaginatedCountRequest } from 'meta/api/request/tablePaginated'
import { CountryIso } from 'meta/area/countryIso'
import { UserFilters } from 'meta/tablePaginated/filters/users'
import { TablePaginateds } from 'meta/tablePaginated/tablePaginateds'

import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getCount = async (req: TablePaginatedCountRequest, res: Response): Promise<void> => {
  try {
    const { countryIso: areaCode, filters: filtersReq } = req.query
    const { assessment, cycle } = req.context
    const countryIso = areaCode as CountryIso

    const filters = TablePaginateds.decodeFilters<UserFilters>(filtersReq)
    const count = await UserController.count({ assessment, cycle, countryIso, filters })

    Requests.sendOk(res, count)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
