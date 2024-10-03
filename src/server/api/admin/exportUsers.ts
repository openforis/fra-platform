import { Response } from 'express'

import { UsersRequest } from 'meta/api/request'
import { TablePaginateds, UserFilters } from 'meta/tablePaginated'
import { User, UserStatus } from 'meta/user'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { ExportService } from 'server/service/export'
import Requests from 'server/utils/requests'

export const exportUsers = async (req: UsersRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, limit, offset, orderBy, orderByDirection, filters } = req.query

    const decodedFilters = TablePaginateds.decodeFilters(filters) as UserFilters
    const { administrators, countries, fullName, roles } = decodedFilters ?? {}

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const fileName = `users-${assessment.props.name}-${cycle.name}.csv`
    const user = Requests.getUser(req)
    const { lang } = user.props

    const { query, queryParams, rowTransformer } = await UserController.getManyExport({
      administrators,
      assessment,
      countries: countries || [],
      cycle,
      fullName: fullName || '',
      lang,
      limit: limit && Number(limit),
      offset: offset && Number(offset),
      orderBy,
      orderByDirection,
      roles: roles || [],
      statuses: [UserStatus.active, UserStatus.disabled, UserStatus.invitationPending],
    })

    // @ts-ignore
    await ExportService.queryToCsvResponseStream<User>({ fileName, query, queryParams, res, rowTransformer })
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
