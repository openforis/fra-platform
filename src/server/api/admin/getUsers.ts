import { Response } from 'express'

import { UsersRequest } from '@meta/api/request'

import { UserController } from '@server/controller/user'
import Requests from '@server/utils/requests'

export const getUsers = async (req: UsersRequest, res: Response) => {
  try {
    const { countryIso, limit, offset, countries, roles } = req.query

    const users = await UserController.getMany({
      countryIso,
      limit: limit && Number(limit),
      offset: offset && Number(offset),
      countries: countries || [],
      roles: roles || [],
    })

    Requests.sendOk(res, users)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
