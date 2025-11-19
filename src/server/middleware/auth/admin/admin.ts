import { NextFunction, Request, Response } from 'express'

import { Users } from 'meta/user/users'

import { _next } from 'server/middleware/auth/_next'
import { Requests } from 'server/utils'

export const requireAdmin = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const user = Requests.getUser(req)

  _next(Users.isAdministrator(user), next)
}
