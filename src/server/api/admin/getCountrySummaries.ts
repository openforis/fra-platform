import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'
import { Lang } from 'meta/lang'
import { TablePaginateds } from 'meta/tablePaginated'
import { CountriesFilters } from 'meta/tablePaginated/countries'

import { AreaController } from 'server/controller/area'
import Requests from 'server/utils/requests'

export const getCountrySummaries = async (req: TablePaginatedDataRequest, res: Response): Promise<void> => {
  try {
    const { filters: filtersReq, limit: limitReq, offset: offsetReq, orderBy, orderByDirection } = req.query

    const user = Requests.getUser(req)
    const queryLang = req.query?.lang
    const lang = queryLang ?? user.props.lang ?? Lang.en

    const filters = TablePaginateds.decodeFilters<CountriesFilters>(filtersReq)
    const limit = limitReq && Number(limitReq)
    const offset = offsetReq && Number(offsetReq)

    const { assessment, cycle } = req.context

    const props = { assessment, cycle, filters, lang, limit, offset, orderBy, orderByDirection }
    const countrySummaries = await AreaController.getCountrySummaries(props)

    Requests.sendOk(res, countrySummaries)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
