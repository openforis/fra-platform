import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import * as passport from 'passport'

import { User } from '@meta/user'

import Requests, { appUri } from '@server/utils/requests'

export const postLocalLogin = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: User, info: any) => {
    if (err) return next(err)

    if (!user) return next(new Error(info.message))

    return req.login(user, (err: any) => {
      if (err) next(err)
      const token = jwt.sign({ user }, process.env.TOKEN_SECRET)
      res.cookie('token', token)
      Requests.sendOk(res)
    })
  })(req, res, next)
}

export const getGoogleLogin = (req: Request, res: Response) => {
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'],
    state: req.query.invitationUuid as string,
  })(req, res)
}

export const getGoogleCallback = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('google', { session: false }, (err: any, user: User) => {
    if (err) {
      next(err)
    } else if (!user) {
      res.clearCookie('token')
      res.redirect('/login?loginFailed=true')
    } else {
      req.login(user, (err: any) => {
        if (err) next(err)
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET)
        res.cookie('token', token)
        res.redirect(`${process.env.NODE_ENV === 'development' ? '/' : appUri}`)
      })
    }
  })(req, res, next)
}
