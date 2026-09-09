import { NextFunction, Request, Response } from 'express'

import { Authorizer } from 'meta/auth/authorizer'

import { _next } from 'server/middleware/auth/_next'
import { Requests } from 'server/utils'

export const requireViewCycle = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { cycle } = req.context
  const user = Requests.getUser(req)

  _next(Authorizer.canViewCycle({ cycle, user }), next)
}
