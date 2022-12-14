import { Request, Response } from 'express'

import { RoleName } from '@meta/user'

import { UserController } from '@server/controller/user'
import { Requests } from '@server/utils'

export const promoteToAdmin = async (req: Request<{ userId: string }>, res: Response) => {
  try {
    const { userId } = req.body

    const user = Requests.getUser(req)

    const updatedUser = await UserController.updateUserRoles({
      roles: [{ role: RoleName.ADMINISTRATOR }],
      userId: Number(userId),
      user,
    })

    Requests.sendOk(res, updatedUser)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
