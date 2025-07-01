import { Response } from 'express'

import { CycleRequest } from 'meta/api/request'
import { UserEditForm } from 'meta/form/userEdit'

import { Requests } from 'server/utils'

type EditUserRequest = CycleRequest<never, { userEdit: string }>

export const editUser = async (req: EditUserRequest, res: Response) => {
  try {
    const userEdit: UserEditForm = JSON.parse(req.body.userEdit)

    Requests.sendOk(res, userEdit)
  } catch (e) {
    Requests.sendErr(res, e)
  }
}
