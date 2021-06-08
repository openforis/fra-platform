import { Express, Response, Request, NextFunction } from 'express'
import * as passport from 'passport'
import { User } from '@core/auth'
import { appUri } from '@server/utils/requestUtils'
import { ApiEndPoint } from '@common/api/endpoint'

const authenticationFailed = (req: any, res: any) => {
  req.logout()
  res.redirect('/login?loginFailed=true')
}

const authenticationSuccessful = (req: Request, user: User, next: NextFunction, done: any) => {
  req.logIn(user, (err: any) => {
    if (err) {
      next(err)
    } else {
      // We have to explicitly save session and wait for saving to complete
      // because of the way chrome handles redirects (it doesn't read the whole response)
      // More here:
      // https://github.com/voxpelli/node-connect-pg-simple/issues/31#issuecomment-230596077
      req.session.save(() => {
        done(`${appUri}`)
      })
    }
  })
}

export const AuthLogin = {
  init: (express: Express): void => {
    // Local login
    express.post(ApiEndPoint.Auth.Login.local, (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate('local', (err: any, user: User, info: any) => {
        if (err) {
          return next(err)
        }
        if (!user) {
          return res.send(info)
        }
        return authenticationSuccessful(req, user, next, (redirectUrl: any) => res.send({ redirectUrl }))
      })(req, res, next)
    })

    // Google login
    express.get(ApiEndPoint.Auth.Login.google, (req: any, res: any) =>
      passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'],
        state: req.query.i,
      })(req, res)
    )

    // Google callback
    express.get(ApiEndPoint.Auth.Login.googleCallback, (req: any, res: any, next: any) => {
      passport.authenticate('google', (err: any, user: any) => {
        if (err) {
          next(err)
        } else if (!user) {
          authenticationFailed(req, res)
        } else {
          authenticationSuccessful(req, user, next, (redirectUrl: any) => res.redirect(redirectUrl))
        }
      })(req, res, next)
    })
  },
}
