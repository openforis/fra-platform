import { Response } from 'express'

import { UsersRequest } from '@meta/api/request'

import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import Requests from '@server/utils/requests'

export const getUsers = async (req: UsersRequest, res: Response) => {
  try {
    const { assessmentName, cycleName, limit, offset, countries, fullname, roles, administrators } = req.query

    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })

    const users = await UserController.getMany({
      assessment,
      cycle,
      limit: limit && Number(limit),
      offset: offset && Number(offset),
      countries: countries || [],
      fullname: fullname || '',
      roles: roles || [],
      administrators,
    })

    Requests.sendOk(res, users)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
