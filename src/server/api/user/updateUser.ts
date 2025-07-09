import { Response } from 'express'

import { UserEditRequest } from 'meta/api/request/user/edit'

import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

export const updateUser = async (req: UserEditRequest, res: Response) => {
  try {
    const profilePicture = req.file
    const userEditForm = req.body
    const user = Requests.getUser(req)

    const updatedUser = await UserController.update({ userEditForm, profilePicture, user })

    Requests.sendOk(res, updatedUser)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
