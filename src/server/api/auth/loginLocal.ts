import { NextFunction, Request, Response } from 'express'
import passport from 'passport'

import { LoginLocalInfoResponse } from 'meta/auth/local'
import { User } from 'meta/user/user'

import { setAuthToken } from 'server/api/auth/utils/setAuthToken'
import Requests from 'server/utils/requests'

export const loginLocal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  passport.authenticate('local', { session: false }, (err: any, user: User, info: LoginLocalInfoResponse) => {
    if (err) return next(err)

    if (!user) return next(new Error(info.message))

    return req.login(user, { session: false }, (err: any) => {
      if (err) next(err)
      setAuthToken(res, user)
      Requests.sendOk(res, { user, info })
    })
  })(req, res, next)
}
