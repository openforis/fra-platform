import { Dates } from '@utils/dates'
import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import * as passport from 'passport'

import { LoginRequest } from '@meta/api/request'
import { User } from '@meta/user'

import Requests, { appUri } from '@server/utils/requests'

const setAuthToken = (res: Response, user: User): void => {
  const token = jwt.sign({ user }, process.env.TOKEN_SECRET)
  res.cookie('token', token, { expires: Dates.addMonths(new Date(), 12) })
}

export const postLocalLogin = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: User, info: any) => {
    if (err) return next(err)

    if (!user) return next(new Error(info.message))

    return req.login(user, (err: any) => {
      if (err) next(err)
      setAuthToken(res, user)
      Requests.sendOk(res)
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
  passport.authenticate('google', { session: false }, (err: any, user: User) => {
    if (err) {
      next(err)
    } else if (!user) {
      res.clearCookie('token')
      res.redirect('/login?loginFailed=true')
    } else {
      req.login(user, (err: any) => {
        if (err) next(err)
        setAuthToken(res, user)
        res.redirect(`${process.env.NODE_ENV === 'development' ? '/' : appUri}`)
      })
    }
  })(req, res, next)
}
