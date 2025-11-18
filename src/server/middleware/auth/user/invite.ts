import { NextFunction, Request, Response } from 'express'

import { CountryParams } from 'meta/api/request/country'
import { Users } from 'meta/user'

import { _getRequestParams } from 'server/middleware/auth/_getRequestParams'
import { _next } from 'server/middleware/auth/_next'
import { Requests } from 'server/utils'

export const requireInviteUser = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const { countryIso } = _getRequestParams<CountryParams>(req)
  const user = Requests.getUser(req)
  const { cycle } = req.context

  _next(Users.getRolesAllowedToEdit({ user, countryIso, cycle }).length > 0, next)
}
