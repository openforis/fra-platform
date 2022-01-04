import * as passport from 'passport'
import * as GoogleStrategy from 'passport-google-oauth'
import { UserRepository } from '@server/repository'
import { User } from '@meta/user'
import { Express } from 'express'
import * as passportLocal from 'passport-local'
import { localStrategyVerifyCallback } from '@server/api/auth/localStrategyVerifyCallback'
import { googleStrategyVerifyCallback } from '@server/api/auth/googleStrategyVerifyCallback'

export const AuthConfig = {
  init: (app: Express) => {
    app.use(passport.initialize())

    const GoogleOAuth2Strategy = GoogleStrategy.OAuth2Strategy

    passport.use(
      new GoogleOAuth2Strategy(
        {
          clientID: process.env.FRA_GOOGLE_CLIENT_ID,
          clientSecret: process.env.FRA_GOOGLE_CLIENT_SECRET,
          callbackURL: `/auth/google/callback`,
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

    passport.deserializeUser((id: number, done) =>
      UserRepository.read({ user: { id } }).then((user: User) => done(null, user))
    )
  },
}
