import { Request, Response } from 'express'

import { UserController } from '@server/controller/user'
import { Requests } from '@server/utils'

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userToUpdate = JSON.parse(req.body.user)

    const updatedUser = await UserController.update({ user: userToUpdate })

    Requests.sendOk(res, updatedUser)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
