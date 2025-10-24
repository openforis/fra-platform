import { NextFunction, Request, Response } from 'express'

import { Authorizer } from 'meta/user'

import { _next } from 'server/middleware/auth/_next'
import { Requests } from 'server/utils'

export const requireEditCountryProps = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const user = Requests.getUser(req)
  const { country, cycle } = req.context

  _next(Authorizer.canEditCountryProps({ country, cycle, user }), next)
}
