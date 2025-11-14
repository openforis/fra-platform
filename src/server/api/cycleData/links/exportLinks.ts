import { Response } from 'express'

import { TablePaginatedDataRequest } from 'meta/api/request/tablePaginated'
import { Link } from 'meta/cycleData/links/link'
import { Lang } from 'meta/lang'
import { TablePaginateds } from 'meta/tablePaginated'
import { LinksFilters } from 'meta/tablePaginated/links'

import { CycleDataController } from 'server/controller/cycleData'
import { ExportService } from 'server/service/export'
import Requests from 'server/utils/requests'

export const exportLinks = async (req: TablePaginatedDataRequest, res: Response): Promise<void> => {
  try {
    const { filters: filtersReq, lang: langReq, orderBy, orderByDirection } = req.query

    const filters = TablePaginateds.decodeFilters<LinksFilters>(filtersReq)

    const { assessment, cycle } = req.context
    const user = Requests.getUser(req)
    const lang = langReq ?? user?.props.lang ?? Lang.en
    const props = { assessment, cycle, filters, lang, orderBy, orderByDirection }
    const { query, queryParams, rowTransformer } = await CycleDataController.Links.getManyExport(props)

    const fileName = `links-${assessment.props.name}-${cycle.name}.csv`

    await ExportService.queryToCsvResponseStream<Link>({ fileName, query, queryParams, res, rowTransformer })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
