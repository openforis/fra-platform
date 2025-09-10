import { Response } from 'express'

import { UserEditRequest } from 'meta/api/request/user/edit'

import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const updateUser = async (req: UserEditRequest, res: Response): Promise<void> => {
  try {
    const user = Requests.getUser(req)

    const userEditForm = req.body
    const profilePicture = req.file

    const { assessment, cycle } = req.context
    const updatedUser = await UserController.update({ assessment, cycle, profilePicture, user, userEditForm })

    Requests.sendOk(res, updatedUser)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
