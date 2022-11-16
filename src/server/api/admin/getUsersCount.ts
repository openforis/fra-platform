import { Response } from 'express'

import { UsersRequest } from '@meta/api/request'

import { UserController } from '@server/controller/user'
import Requests from '@server/utils/requests'

export const getUsersCount = async (req: UsersRequest, res: Response) => {
  try {
    const { countries, roles } = req.query

    const count = await UserController.count({
      countries: countries || [],
      roles: roles || [],
    })

    Requests.sendOk(res, count)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
