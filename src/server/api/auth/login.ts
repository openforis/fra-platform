import { NextFunction, Request, Response } from 'express'
import * as passport from 'passport'

import { LoginRequest } from '@meta/api/request'
import { ClientRoutes } from '@meta/app'
import { AuthToken } from '@meta/auth'
import { User } from '@meta/user'

import Requests, { appUri } from '@server/utils/requests'

import { setAuthToken } from './utils/setAuthToken'

export const postLocalLogin = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', { session: false }, (err: any, user: User, info: any) => {
    if (err) return next(err)

    if (!user) return next(new Error(info.message))

    return req.login(user, { session: false }, (err: any) => {
      if (err) next(err)
      setAuthToken(res, user)
      Requests.sendOk(res, info)
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
  passport.authenticate('google', { session: false }, (err: any, user: User, msg: any) => {
    if (err) {
      next(err)
    } else if (!user) {
      res.clearCookie(AuthToken.fraAuthToken)
      res.redirect(`/login?loginError=${msg.message}`)
    } else {
      req.login(user, (err: any) => {
        if (err) next(err)
        setAuthToken(res, user)
        let redirectUrl = process.env.NODE_ENV === 'development' ? '/' : appUri
        if (msg?.message) {
          const data = JSON.parse(msg.message)
          redirectUrl += ClientRoutes.Assessment.Home.Root.getLink(data)
        }
        res.redirect(redirectUrl)
      })
    }
  })(req, res, next)
}
