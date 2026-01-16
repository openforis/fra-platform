import { NextFunction, Request, Response } from 'express'

import { Areas } from 'meta/area/areas'
import { Users } from 'meta/user/users'
import { Objects } from 'utils/objects'

import { _getAuthCycleParams } from 'server/middleware/auth/_getAuthCycleParams'
import { _getRequestParams } from 'server/middleware/auth/_getRequestParams'
import { _next } from 'server/middleware/auth/_next'
import { Requests } from 'server/utils'

export const requireVerifyLinks = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { countryIso: countryIsoParam } = _getRequestParams<{ countryIso?: string }>(req)
  const user = Requests.getUser(req)

  const isCountry = !Objects.isEmpty(countryIsoParam) && Areas.isISOCountry(countryIsoParam)
  if (!isCountry) {
    _next(Users.isAdministrator(user), next)
    return
  }

  const { countryIso, cycle } = await _getAuthCycleParams(req, next)

  const isAllowed =
    Users.isAdministrator(user) ||
    Users.isReviewer(user, countryIso, cycle) ||
    Users.isRegionalFocalPoint(user, countryIso, cycle)

  _next(isAllowed, next)
}
