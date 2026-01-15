import { NextFunction, Request, Response } from 'express'

import { Users } from 'meta/user/users'

import { _getAuthCycleParams } from 'server/middleware/auth/_getAuthCycleParams'
import { _next } from 'server/middleware/auth/_next'

export const requireVerifyLinks = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { countryIso, cycle, user } = await _getAuthCycleParams(req, next)

  const isAllowed =
    Users.isAdministrator(user) ||
    Users.isReviewer(user, countryIso, cycle) ||
    Users.isRegionalFocalPoint(user, countryIso, cycle)

  _next(isAllowed, next)
}
