import { NextFunction, Response } from 'express'

import { CountryRequest } from 'meta/api/request/country'
import { CountryIso } from 'meta/area/countryIso'
import { Authorizer } from 'meta/auth/authorizer'

import { UserController } from 'server/controller/user'
import { _next } from 'server/middleware/auth/_next'
import { Requests } from 'server/utils'

export const requireRemoveUserRole = async (
  req: CountryRequest<{ userUuid: string }>,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const { countryIso, userUuid } = req.query
  const user = Requests.getUser(req)
  const { cycle } = req.context

  const target = await UserController.getOne({ uuid: userUuid, allowDisabled: true })
  _next(Authorizer.canDisableUser({ countryIso: countryIso as CountryIso, cycle, target, user }), next)
}
