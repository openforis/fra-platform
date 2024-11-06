import type { Response } from 'express'

import type { UsersRequest } from 'meta/api/request'
import { type UserFilters, TablePaginateds } from 'meta/tablePaginated'
import { UserStatus } from 'meta/user'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getUsers = async (req: UsersRequest, res: Response) => {
  try {
    const {
      assessmentName,
      cycleName,
      limit: limitProp,
      offset: offsetProp,
      orderBy,
      orderByDirection,
      filters,
    } = req.query

    const decodedFilters = TablePaginateds.decodeFilters(filters) as UserFilters
    const { administrators, countries = [], fullName = '', roles = [] } = decodedFilters ?? {}

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const invitedUsers = true
    const limit = limitProp && Number(limitProp)
    const offset = offsetProp && Number(offsetProp)
    const statuses = [UserStatus.active, UserStatus.disabled, UserStatus.invitationPending]

    const params = {
      administrators,
      assessment,
      countries,
      cycle,
      fullName,
      limit,
      offset,
      orderBy,
      orderByDirection,
      roles,
      statuses,
      invitedUsers,
    }
    const users = await UserController.getMany(params)

    Requests.sendOk(res, users)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
