import { Request, Response } from 'express'

import { UserController } from '@server/controller/user'
import { Requests } from '@server/utils'

export const demoteToUser = async (req: Request<{ userId: string }>, res: Response) => {
  try {
    const { userId } = req.body

    const user = Requests.getUser(req)

    const updatedUser = await UserController.updateUserRoles({
      roles: [],
      userId: Number(userId),
      user,
    })

    Requests.sendOk(res, updatedUser)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
