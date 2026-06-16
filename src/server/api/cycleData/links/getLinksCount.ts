import { Response } from 'express'

import { TablePaginatedCountRequest } from 'meta/api/request/tablePaginated'
import { LinksFilters } from 'meta/tablePaginated/filters/links'
import { TablePaginateds } from 'meta/tablePaginated/tablePaginateds'

import { LinksController } from 'server/controller/cycleData/links'
import Requests from 'server/utils/requests'

export const getLinksCount = async (req: TablePaginatedCountRequest, res: Response): Promise<void> => {
  try {
    const { filters: filtersReq } = req.query
    const { assessment, country, cycle } = req.context
    const { countryIso } = country ?? {}

    const decodedFilters = TablePaginateds.decodeFilters<LinksFilters>(filtersReq)
    const filters = countryIso ? { ...decodedFilters, countries: [countryIso] } : decodedFilters
    const linksCount = await LinksController.getCount({ assessment, cycle, filters })

    Requests.sendOk(res, linksCount)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
