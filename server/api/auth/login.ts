import { Response, Request, NextFunction } from 'express'
import * as passport from 'passport'
import { appUri } from '@server/utils/requests'
import * as jwt from 'jsonwebtoken'
import { User } from '@meta/user'

const authenticationFailed = (req: any, res: any) => {
  req.logout()
  res.redirect('/login?loginFailed=true')
}

export const postLocalLogin = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: User, info: any) => {
    if (err) return next(err)

    if (!user) return res.send(info)

    return req.login(user, (err: any) => {
      if (err) next(err)
      const token = jwt.sign({ user }, process.env.TOKEN_SECRET)
      res.cookie('token', token)
      res.redirect(`${process.env.NODE_ENV === 'development' ? '/' : appUri}`)
    })
  })(req, res, next)
}

export const getGoogleLogin = (req: Request, res: Response) => {
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'],
    state: req.query.invitationUuid as string,
  })(req, res)
}

export const getGoogleCallback = (req: any, res: Response, next: NextFunction) => {
  passport.authenticate('google', { session: false }, (err: any, user: User) => {
    if (err) {
      next(err)
    } else if (!user) {
      authenticationFailed(req, res)
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
