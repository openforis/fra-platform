import { Response } from 'express'

import { AdminUsersRequest } from 'meta/api/request/admin/users'

import { getUsersGetManyPropsFromRequest } from 'server/api/admin/_getUsersGetManyPropsFromRequest'
import { UserController } from 'server/controller/user'
import Requests from 'server/utils/requests'

export const getUsers = async (req: AdminUsersRequest, res: Response): Promise<void> => {
  try {
    const props = await getUsersGetManyPropsFromRequest(req)

    const users = await UserController.getMany(props)

    Requests.sendOk(res, users)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
