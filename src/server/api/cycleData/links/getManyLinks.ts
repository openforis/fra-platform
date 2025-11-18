import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'
import { LinksFilters } from 'meta/tablePaginated/filters/links'
import { TablePaginateds } from 'meta/tablePaginated/tablePaginateds/tablePaginateds'

import { CycleDataController } from 'server/controller/cycleData'
import Requests from 'server/utils/requests'

export const getManyLinks = async (req: TablePaginatedDataRequest, res: Response): Promise<void> => {
  try {
    const { filters: filtersReq, limit: limitReq, offset: offsetReq, orderBy, orderByDirection } = req.query

    const filters = TablePaginateds.decodeFilters<LinksFilters>(filtersReq)
    const limit = limitReq && Number(limitReq)
    const offset = offsetReq && Number(offsetReq)

    const { assessment, cycle } = req.context
    const props = { assessment, cycle, filters, limit, offset, orderBy, orderByDirection }

    const links = await CycleDataController.Links.getMany(props)

    Requests.send(res, links)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
