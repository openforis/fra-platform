import { NextFunction, Response } from 'express'

import { UserEditRequest } from 'meta/api/request/user/edit'
import { Authorizer } from 'meta/auth/authorizer'

import { UserController } from 'server/controller/user'
import { _next } from 'server/middleware/auth/_next'
import { Requests } from 'server/utils'

export const requireEditUser = async (req: UserEditRequest, _res: Response, next: NextFunction): Promise<void> => {
  const { countryIso } = req.query
  const user = Requests.getUser(req)
  const userEditForm = req.body
  const { cycle } = req.context

  const target = await UserController.getOne({ id: userEditForm.user.id })

  _next(Authorizer.canEditUser({ cycle, countryIso, target, user }), next)
}
