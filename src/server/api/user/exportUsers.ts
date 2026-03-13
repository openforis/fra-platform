import { Response } from 'express'

import { TablePaginatedCountRequest } from 'meta/api/request/tablePaginated'
import { CountryIso } from 'meta/area/countryIso'
import { UserFilters } from 'meta/tablePaginated/filters/users'
import { TablePaginateds } from 'meta/tablePaginated/tablePaginateds'
import { UserStatus } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { UserController } from 'server/controller/user'
import { ExportService } from 'server/service/export'
import Requests from 'server/utils/requests'

const defaultFilters: UserFilters = { statuses: [UserStatus.active, UserStatus.invitationPending] }

export const exportUsers = async (req: TablePaginatedCountRequest, res: Response): Promise<void> => {
  try {
    const { countryIso: areaCode, filters: filtersReq, lang: langQuery } = req.query
    const { assessment, cycle } = req.context
    const user = Requests.getUser(req)
    const lang = langQuery ?? user.props.lang
    const countryIso = areaCode as CountryIso

    const fileNameParts = ['users', assessment.props.name, cycle.name]
    if (countryIso) fileNameParts.push(countryIso)
    const fileName = `${fileNameParts.join('-')}.csv`

    const filters = TablePaginateds.decodeFilters<UserFilters>(filtersReq)

    const { query, queryParams, rowTransformer } = await UserController.getManyExport({
      assessment,
      cycle,
      countryIso,
      filters: Objects.isEmpty(filters) ? defaultFilters : filters,
      lang,
    })

    await ExportService.queryToCsvResponseStream({ fileName, query, queryParams, res, rowTransformer })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
