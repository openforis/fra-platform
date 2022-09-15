import { Express } from 'express'
import * as passport from 'passport'
import * as GoogleStrategy from 'passport-google-oauth'
import * as passportLocal from 'passport-local'

import { ApiEndPoint } from '@meta/api/endpoint'
import { User } from '@meta/user'

import { googleStrategyVerifyCallback } from '@server/api/auth/googleStrategyVerifyCallback'
import { localStrategyVerifyCallback } from '@server/api/auth/localStrategyVerifyCallback'
import { UserRepository } from '@server/repository/public/user'

export const AuthConfig = {
  init: (app: Express) => {
    app.use(passport.initialize())

    const GoogleOAuth2Strategy = GoogleStrategy.OAuth2Strategy

    passport.use(
      new GoogleOAuth2Strategy(
        {
          clientID: process.env.FRA_GOOGLE_CLIENT_ID,
          clientSecret: process.env.FRA_GOOGLE_CLIENT_SECRET,
          callbackURL: ApiEndPoint.Auth.googleCallback(),
          passReqToCallback: true,
        },
        googleStrategyVerifyCallback
      )
    )

    const LocalStrategy = passportLocal.Strategy

    passport.use(
      new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true,
        },
        localStrategyVerifyCallback
      )
    )

    passport.serializeUser((user: User, done) => done(null, user.id))

    passport.deserializeUser((id: number, done) => UserRepository.getOne({ id }).then((user: User) => done(null, user)))
  },
}
