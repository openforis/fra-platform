import { NextFunction, Request, Response } from 'express'
import * as passport from 'passport'

import { LoginRequest } from 'meta/api/request'
import { AuthToken } from 'meta/auth'
import { Routes } from 'meta/routes'
import { User } from 'meta/user'

import { ProcessEnv } from 'server/utils'
import Requests from 'server/utils/requests'

import { setAuthToken } from './utils/setAuthToken'

export const postLocalLogin = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', { session: false }, (err: any, user: User, info: any) => {
    if (err) return next(err)

    if (!user) return next(new Error(info.message))

    return req.login(user, { session: false }, (err: any) => {
      if (err) next(err)
      setAuthToken(res, user)
      Requests.sendOk(res, user)
    })
  })(req, res, next)
}

export const getGoogleLogin = (req: LoginRequest, res: Response) => {
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'],
    state: JSON.stringify({
      assessmentName: req.query.assessmentName,
      cycleName: req.query.cycleName,
      invitationUuid: req.query.invitationUuid,
    }),
  })(req, res)
}

export const getGoogleCallback = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('google', { session: false }, (err: any, user: User, msg: any) => {
    const state = JSON.parse(req.query.state as string) ?? {}

    const { assessmentName, cycleName } = state

    if (err) {
      next(err)
    } else if (!user) {
      res.clearCookie(AuthToken.fraAuthToken)
      res.redirect(Routes.Login.generatePath({ assessmentName, cycleName }, { loginError: msg.message }))
    } else {
      req.login(user, (err: any) => {
        if (err) next(err)
        setAuthToken(res, user)
        const redirectUrl = process.env.NODE_ENV === 'development' ? '/' : ProcessEnv.appUri
        res.redirect(redirectUrl)
      })
    }
  })(req, res, next)
}
