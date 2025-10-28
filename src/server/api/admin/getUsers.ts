import { Response } from 'express'

import { UsersRequest } from 'meta/api/request'

import { UserController } from 'server/controller/user'
import { getUsersGetManyPropsFromRequest } from 'server/api/admin/_getUsersGetManyPropsFromRequest'
import Requests from 'server/utils/requests'

export const getUsers = async (req: UsersRequest, res: Response): Promise<void> => {
  try {
    const props = await getUsersGetManyPropsFromRequest(req)

    const users = await UserController.getMany(props)

    Requests.sendOk(res, users)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
