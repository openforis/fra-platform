import { Response } from 'express'

import { TablePaginatedCountRequest } from 'meta/api/request/tablePaginated'
import { LinksFilters } from 'meta/tablePaginated/filters/links'
import { TablePaginateds } from 'meta/tablePaginated/tablePaginateds/tablePaginateds'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getLinksCount = async (req: TablePaginatedCountRequest, res: Response): Promise<void> => {
  try {
    const { filters: filtersReq } = req.query
    const { assessment, cycle } = req.context

    const filters = TablePaginateds.decodeFilters<LinksFilters>(filtersReq)
    const linksCount = await CycleDataController.Links.getCount({ assessment, cycle, filters })

    Requests.sendOk(res, linksCount)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
