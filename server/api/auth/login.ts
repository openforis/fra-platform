import { Express, Response, Request, NextFunction } from 'express'
import * as passport from 'passport'
import { appUri } from '@server/utils/requests'
import { ApiEndPoint } from '@common/api/endpoint'
import * as jwt from 'jsonwebtoken'

const authenticationFailed = (req: any, res: any) => {
  req.logout()
  res.redirect('/login?loginFailed=true')
}

export const AuthLogin = {
  init: (express: Express): void => {
    // Local login

    // Google login
    express.get(ApiEndPoint.Auth.Login.google(), (req: Request, res: Response) => {
      passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'],
      })(req, res)
    })

    // Google callback
    express.get(ApiEndPoint.Auth.Login.googleCallback(), (req: any, res: Response, next: NextFunction) => {
      passport.authenticate('google', (err: any, user: any) => {
        if (err) {
          next(err)
        } else if (!user) {
          authenticationFailed(req, res)
        } else {
          req.login(user, (err: any) => {
            if (err) next(err)
            console.log(jwt.sign({ user }, process.env.TOKEN_SECRET))
            res.redirect(`${process.env.NODE_ENV === 'development' ? '/' : appUri}`)
          })
        }
      })(req, res, next)
    })
  },
}
