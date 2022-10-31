import { Response } from 'express'

import { UsersRequest } from '@meta/api/request'

import { UserController } from '@server/controller/user'
import Requests from '@server/utils/requests'

export const getUsers = async (
  req: UsersRequest<{ print: string; limit?: string; offset?: string }>,
  res: Response
) => {
  try {
    const { countryIso, limit, offset } = req.query

    const users = UserController.getMany({
      countryIso,
      limit: limit && Number(limit),
      offset: offset && Number(offset),
    })

    Requests.sendOk(res, users)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
