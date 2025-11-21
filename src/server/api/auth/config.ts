import { Express } from 'express'
import * as passport from 'passport'

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

    // passport.serializeUser((user: User, done) => done(null, user.id))
    // passport.deserializeUser((id: number, done) => UserRepository.getOne({ id }).then((user: User) => done(null, user)))
  },
}
