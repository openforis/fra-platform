import { Request, Response } from 'express'

import { UserController } from '@server/controller/user'
import { Requests } from '@server/utils'

export const updateUserRoles = async (req: Request, res: Response) => {
  try {
    const { roles, userId } = req.body

    const user = Requests.getRequestUser(req)

    const updatedUser = await UserController.updateUserRoles({
      roles,
      userId,
      user,
    })

    Requests.sendOk(res, updatedUser)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
