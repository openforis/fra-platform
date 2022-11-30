import { NextFunction, Request, Response } from 'express'
import * as passport from 'passport'

import { LoginRequest } from '@meta/api/request'
import { User } from '@meta/user'

import { getAuthToken } from '@server/api/auth/utils/getAuthToken'
import Requests, { appUri } from '@server/utils/requests'

export const postLocalLogin = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', { session: false }, (err: any, user: User, info: any) => {
    if (err) return next(err)

    if (!user) return next(new Error(info.message))

    return req.login(user, { session: false }, (err: any) => {
      if (err) next(err)
      const token = getAuthToken(user)
      Requests.sendOk(res, { token })
    })
  })(req, res, next)
}

export const getGoogleLogin = (req: LoginRequest, res: Response) => {
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'],
    state: req.query.invitationUuid,
  })(req, res)
}

export const getGoogleCallback = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('google', { session: false }, (err: any, user: User, info: any) => {
    if (err) {
      next(err)
    } else if (!user) {
      res.clearCookie('token')
      res.redirect(`/login?loginError=${info.message}`)
    } else {
      req.login(user, (err: any) => {
        if (err) next(err)
        // TODO setAuthToken(res, user)
        res.redirect(`${process.env.NODE_ENV === 'development' ? '/' : appUri}`)
      })
    }
  })(req, res, next)
}
