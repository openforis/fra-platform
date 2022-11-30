import { Request } from 'express'
import { PassportStatic } from 'passport'
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'

import { User } from '@meta/user'

import { UserController } from '@server/controller/user'

const jwtStrategyVerifyCallback = async (_req: Request, { id }: User, done: VerifiedCallback) => {
  console.log(_req.baseUrl)
  const sendErr = (message: string) => done(null, false, { message })
  try {
    const user = await UserController.getOne({ id })
    return done(null, user)
  } catch (e) {
    return sendErr('login.noUser')
  }
}

export const jwtStrategy = (passport: PassportStatic) => {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.TOKEN_SECRET,
        passReqToCallback: true,
      },
      jwtStrategyVerifyCallback
    )
  )
}
