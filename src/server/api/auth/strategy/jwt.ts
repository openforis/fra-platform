import { Request } from 'express'
import { PassportStatic } from 'passport'
import { Strategy, VerifiedCallback } from 'passport-jwt'

import { AuthToken } from '@meta/auth'
import { User } from '@meta/user'

import { UserController } from '@server/controller/user'

const jwtFromRequest = (req: Request) => {
  let token = null
  if (req && req.cookies) token = req.cookies[AuthToken.fraAuthToken]
  return token
}

const jwtStrategyVerifyCallback = async (_req: Request, { uuid }: User, done: VerifiedCallback) => {
  const sendErr = (message: string) => done(null, false, { message })
  try {
    if (!uuid) {
      throw new Error('login.invalidToken')
    }

    const user = await UserController.getOne({ uuid })

    return done(null, user)
  } catch (e) {
    return sendErr(e.message ?? 'login.noUser')
  }
}

export const jwtStrategy = (passport: PassportStatic) => {
  passport.use(
    new Strategy(
      {
        jwtFromRequest,
        secretOrKey: process.env.TOKEN_SECRET,
        passReqToCallback: true,
      },
      jwtStrategyVerifyCallback
    )
  )
}
