import { Request, Response } from 'express'

import { UserController } from '@server/controller/user'
import { Requests } from '@server/utils'

export const updateUser = async (req: Request, res: Response) => {
  try {
    const profilePicture = req.file
    const userToUpdate = JSON.parse(req.body.user)
    const user = Requests.getRequestUser(req)

    const updatedUser = await UserController.update({
      userToUpdate,
      profilePicture,
      user,
    })

    Requests.sendOk(res, updatedUser)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
