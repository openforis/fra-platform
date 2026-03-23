import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'
import { CountryIso } from 'meta/area/countryIso'
import { UserFilters } from 'meta/tablePaginated/filters/users'
import { TablePaginateds } from 'meta/tablePaginated/tablePaginateds'

import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getMany = async (req: TablePaginatedDataRequest, res: Response): Promise<void> => {
  try {
    const {
      countryIso: areaCode,
      filters: filtersReq,
      limit: limitReq,
      offset: offsetReq,
      orderBy,
      orderByDirection,
    } = req.query
    const { assessment, cycle } = req.context
    const countryIso = areaCode as CountryIso
    const filters = TablePaginateds.decodeFilters<UserFilters>(filtersReq)
    const limit = limitReq && Number(limitReq)
    const offset = offsetReq && Number(offsetReq)

    const users = await UserController.getMany({
      assessment,
      cycle,
      countryIso,
      filters,
      limit,
      offset,
      orderBy,
      orderByDirection,
    })

    Requests.sendOk(res, users)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
