import { Request, Response } from 'express'

import { RoleName, Users } from 'meta/user'

import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const updateUserAdminRole = async (req: Request<{ userUuid: string }>, res: Response) => {
  try {
    const { userUuid } = req.body

    const user = Requests.getUser(req)

    const userToUpdate = await UserController.getOne({ uuid: userUuid })

    const updatedUser = await UserController.updateUserRoles({
      roles: !Users.isAdministrator(userToUpdate) ? [{ role: RoleName.ADMINISTRATOR }] : [],
      userUuid,
      user,
    })

    Requests.sendOk(res, updatedUser)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
