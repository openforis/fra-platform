import { Response } from 'express'

import { UsersRequest } from 'meta/api/request'
import { TablePaginateds, UserFilters } from 'meta/tablePaginated'
import { UserStatus } from 'meta/user'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getUsers = async (req: UsersRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, limit, offset, orderBy, orderByDirection, filters } = req.query

    const decodedFilters = TablePaginateds.decodeFilters(filters) as UserFilters
    const { administrators, countries, fullName, roles } = decodedFilters ?? {}

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const users = await UserController.getMany({
      administrators,
      assessment,
      countries: countries || [],
      cycle,
      fullName: fullName || '',
      limit: limit && Number(limit),
      offset: offset && Number(offset),
      orderBy,
      orderByDirection,
      roles: roles || [],
      statuses: [UserStatus.active, UserStatus.disabled, UserStatus.invitationPending],
    })

    Requests.sendOk(res, users)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
