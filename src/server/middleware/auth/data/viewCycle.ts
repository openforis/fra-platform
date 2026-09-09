import { NextFunction, Request, Response } from 'express'

import { Authorizer } from 'meta/auth/authorizer'

import { _next } from 'server/middleware/auth/_next'
import { Requests } from 'server/utils'

export const requireCycleView = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { cycle } = req.context
  const user = Requests.getUser(req)

  _next(Authorizer.canCycleView({ cycle, user }), next)
}
