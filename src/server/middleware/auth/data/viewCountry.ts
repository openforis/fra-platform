import { NextFunction, Request, Response } from 'express'

import { Authorizer } from 'meta/auth/authorizer'

import { _getAuthCycleParams } from 'server/middleware/auth/_getAuthCycleParams'
import { _next } from 'server/middleware/auth/_next'

export const requireViewCountry = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { assessment, country, countryIso, cycle, user } = await _getAuthCycleParams(req, next)

  _next(Authorizer.canViewCountry({ assessment, country, areaCode: countryIso, cycle, user }), next)
}
