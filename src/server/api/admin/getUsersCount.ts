import { Response } from 'express'

import { UsersRequest } from 'meta/api/request'
import { TablePaginateds, UserFilters } from 'meta/tablePaginated'
import { UserStatus } from 'meta/user'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getUsersCount = async (req: UsersRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, filters } = req.query

    const decodedFilters = TablePaginateds.decodeFilters(filters) as UserFilters
    const { administrators, countries, fullName, roles, disabled } = decodedFilters ?? {}

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const statuses = disabled ? [UserStatus.disabled] : [UserStatus.active, UserStatus.invitationPending]

    const count = await UserController.count({
      administrators,
      assessment,
      countries,
      cycle,
      fullName,
      roles,
      statuses,
    })

    Requests.sendOk(res, count)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
