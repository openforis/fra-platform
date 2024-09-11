import { Response } from 'express'

import { UsersRequest } from 'meta/api/request'

import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getUsersCount = async (req: UsersRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, countries, fullName, includeRoleTotals, roles } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const count = await UserController.count({
      assessment,
      cycle,
      countries: countries || [],
      fullName: fullName || '',
      includeRoleTotals,
      roles: roles || [],
    })

    Requests.sendOk(res, count)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
