import { Express } from 'express'
import * as passport from 'passport'

import { User } from 'meta/user'

import { googleStrategy } from 'server/api/auth/strategy/google'
import { jwtStrategy } from 'server/api/auth/strategy/jwt'
import { localStrategy } from 'server/api/auth/strategy/local'
import { UserRepository } from 'server/repository/public/user'

export const AuthConfig = {
  init: (app: Express) => {
    app.use(passport.initialize())

    // Strategies: google, local, jwt
    googleStrategy(passport)
    localStrategy(passport)
    jwtStrategy(passport)

    passport.serializeUser((user: User, done) => done(null, user.id))
    passport.deserializeUser((id: number, done) => UserRepository.getOne({ id }).then((user: User) => done(null, user)))
  },
}
