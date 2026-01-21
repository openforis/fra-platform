import { NextFunction, Request, Response } from 'express'

import { Authorizer } from 'meta/auth/authorizer'

import { _next } from 'server/middleware/auth/_next'
import { Requests } from 'server/utils'

export const requireVerifyLinks = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const user = Requests.getUser(req)
  const { country, cycle } = req.context

  _next(Authorizer.canVerifyLinks({ user, countryIso: country?.countryIso, cycle }), next)
}
