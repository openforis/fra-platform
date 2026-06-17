import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'
import { Link } from 'meta/cycleData/links/link'
import { Lang } from 'meta/lang'
import { LinksFilters } from 'meta/tablePaginated/filters/links'
import { TablePaginateds } from 'meta/tablePaginated/tablePaginateds'
import { Objects } from 'utils/objects'

import { LinksController } from 'server/controller/cycleData/links'
import { ExportService } from 'server/service/export'
import Requests from 'server/utils/requests'

export const exportLinks = async (req: TablePaginatedDataRequest, res: Response): Promise<void> => {
  try {
    const { filters: filtersReq, lang: langReq, orderBy, orderByDirection } = req.query

    const decodedFilters = TablePaginateds.decodeFilters<LinksFilters>(filtersReq)

    const { assessment, country, cycle } = req.context
    const { countryIso } = country ?? {}
    const filters = countryIso ? { ...decodedFilters, countries: [countryIso] } : decodedFilters
    const user = Requests.getUser(req)
    const lang = langReq ?? user?.props.lang ?? Lang.en
    const includeCountryIso = Objects.isEmpty(countryIso)
    const props = { assessment, cycle, filters, includeCountryIso, lang, orderBy, orderByDirection }
    const { query, queryParams, rowTransformer } = await LinksController.getManyExport(props)

    const fileName = countryIso
      ? `links-${assessment.props.name}-${cycle.name}-${countryIso}.csv`
      : `links-${assessment.props.name}-${cycle.name}.csv`

    await ExportService.queryToCsvResponseStream<Link>({ fileName, query, queryParams, res, rowTransformer })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
