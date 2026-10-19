import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'
import { LinksFilters } from 'meta/tablePaginated/filters/links'
import { TablePaginateds } from 'meta/tablePaginated/tablePaginateds'

import { LinksController } from 'server/controller/cycleData/links'
import Requests from 'server/utils/requests'

export const getManyLinks = async (req: TablePaginatedDataRequest, res: Response): Promise<void> => {
  try {
    const { filters: filtersReq, limit: limitReq, offset: offsetReq, orderBy, orderByDirection } = req.query

    const decodedFilters = TablePaginateds.decodeFilters<LinksFilters>(filtersReq)
    const limit = limitReq && Number(limitReq)
    const offset = offsetReq && Number(offsetReq)

    const { assessment, country, cycle } = req.context
    const { countryIso } = country ?? {}
    const filters = countryIso ? { ...decodedFilters, countries: [countryIso] } : decodedFilters
    const props = { assessment, cycle, filters, limit, offset, orderBy, orderByDirection }

    const links = await LinksController.getMany(props)

    Requests.send(res, links)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
