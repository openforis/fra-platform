import { Response } from 'express'

import { UsersRequest } from 'meta/api/request'
import { TablePaginateds, UserFilters } from 'meta/tablePaginated'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getUsersCount = async (req: UsersRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, filters } = req.query

    const decodedFilters = TablePaginateds.decodeFilters(filters) as UserFilters
    const { administrators, countries, fullName, roles } = decodedFilters ?? {}

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const count = await UserController.count({
      administrators,
      assessment,
      countries: countries || [],
      cycle,
      fullName: fullName || '',
      roles: roles || [],
    })

    Requests.sendOk(res, count)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
