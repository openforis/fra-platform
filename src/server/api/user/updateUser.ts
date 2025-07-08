import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { UserEditForm } from 'meta/form/userEdit/form'

import { UserController } from 'server/controller/user'
import { Requests } from 'server/utils'

type EditUserRequest = CycleRequest<unknown, UserEditForm>

export const updateUser = async (req: EditUserRequest, res: Response) => {
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
