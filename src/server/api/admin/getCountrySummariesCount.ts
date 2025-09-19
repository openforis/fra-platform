import { Response } from 'express'

import { TablePaginatedCountRequest } from 'meta/api/request/tablePaginated'
import { TablePaginateds } from 'meta/tablePaginated'
import { CountriesFilters } from 'meta/tablePaginated/countries'

import { AreaController } from 'server/controller/area'
import Requests from 'server/utils/requests'

export const getCountrySummariesCount = async (req: TablePaginatedCountRequest, res: Response): Promise<void> => {
  try {
    const { filters: filtersReq } = req.query
    const { assessment, cycle } = req.context

    const filters = TablePaginateds.decodeFilters<CountriesFilters>(filtersReq)

    const summariesCount = await AreaController.getCountrySummariesCount({ assessment, cycle, filters })

    Requests.sendOk(res, summariesCount)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
