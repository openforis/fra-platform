import { NextFunction, Request, Response } from 'express'
import passport from 'passport'

import { LoginRequest } from 'meta/api/request/auth/login'
import { AuthToken } from 'meta/auth/token'
import { Routes } from 'meta/routes/routes'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { ProcessEnv } from 'server/utils'

import { setAuthToken } from './utils/setAuthToken'

export const loginGoogle = (req: LoginRequest, res: Response): void => {
  passport.authenticate('google', {
    session: false,
    scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'],
    state: JSON.stringify({
      assessmentName: req.query.assessmentName,
      countryIso: req.query.countryIso,
      cycleName: req.query.cycleName,
      invitationUuid: req.query.invitationUuid,
    }),
  })(req, res)
}

export const loginGoogleCallback = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('google', { session: false }, (err: any, user: User, msg: any) => {
    const state = JSON.parse(req.query.state as string) ?? {}
    const { assessmentName, countryIso, cycleName } = state

    if (err) {
      next(err)
    } else if (!user) {
      res.clearCookie(AuthToken.fraAuthToken)
      res.redirect(Routes.Login.generatePath({ assessmentName, cycleName }, { loginError: msg.message }))
    } else {
      req.login(user, { session: false }, (err: any) => {
        if (err) next(err)
        setAuthToken(res, user)

        const countryPath = !Objects.isEmpty(countryIso)
          ? Routes.Country.generatePath({ assessmentName, countryIso, cycleName })
          : ''
        const redirectUrl =
          process.env.NODE_ENV === 'development' ? countryPath || '/' : `${ProcessEnv.appUri}${countryPath}`

        res.redirect(redirectUrl)
      })
    }
  })(req, res, next)
}
