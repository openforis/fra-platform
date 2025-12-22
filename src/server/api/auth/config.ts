import { Express } from 'express'
import passport from 'passport'

import { User } from 'meta/user/user'

import { googleStrategy } from 'server/api/auth/strategy/google'
import { jwtStrategy } from 'server/api/auth/strategy/jwt'
import { localStrategy } from 'server/api/auth/strategy/local'

export const AuthConfig = {
  init: (app: Express): void => {
    app.use(passport.initialize())

    // Strategies: google, local, jwt
    googleStrategy(passport)
    localStrategy(passport)
    jwtStrategy(passport)

    app.use((req, res, next) => {
      passport.authenticate('jwt', { session: false }, (err: any, user: User, info: any) => {
        // If authentication failed, `user` will be set to false. If an exception occurred, `err` will be set.
        if (err) return next(info)
        // eslint-disable-next-line no-param-reassign
        if (user) req.user = user
        return next()
      })(req, res, next)
    })
  },
}
