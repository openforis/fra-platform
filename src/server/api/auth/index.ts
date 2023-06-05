import { Express } from 'express'
import * as passport from 'passport'

import { ApiEndPoint } from 'meta/api/endpoint'

import { AuthConfig } from './config'
import { getGoogleCallback, getGoogleLogin, postLocalLogin } from './login'
import { postChangePassword } from './postChangePassword'
import { postLogout } from './postLogout'
import { postResetPassword } from './postResetPassword'

export const AuthApi = {
  init: (express: Express): void => {
    // Initialize auth config
    AuthConfig.init(express)

    express.post(ApiEndPoint.Auth.login(), postLocalLogin)
    express.get(ApiEndPoint.Auth.google(), getGoogleLogin)
    express.get(ApiEndPoint.Auth.googleCallback(), getGoogleCallback)

    express.post(ApiEndPoint.Auth.logout(), postLogout)

    express.post(ApiEndPoint.Auth.changePassword(), postChangePassword)
    express.post(ApiEndPoint.Auth.resetPassword(), postResetPassword)

    express.use(function (req, res, next) {
      passport.authenticate('jwt', { session: false }, function (err: any, user: Express.User, info: any) {
        // If authentication failed, `user` will be set to false. If an exception occurred, `err` will be set.
        if (err) return next(info)
        // eslint-disable-next-line no-param-reassign
        if (user) req.user = user
        return next()
      })(req, res, next)
    })
  },
}
