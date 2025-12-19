import { Request } from 'express'
import { PassportStatic } from 'passport'
import { VerifiedCallback } from 'passport-jwt'
import passportLocal from 'passport-local'

import { Objects } from 'utils/objects'
import { RegExps } from 'utils/regExps'

import { localAcceptInvitation } from 'server/api/auth/strategy/_local/acceptInvitation'
import { localLogin } from 'server/api/auth/strategy/_local/login'

const localStrategyVerifyCallback = async (
  req: Request,
  email: string,
  password: string,
  done: VerifiedCallback
): Promise<void> => {
  const { invitationUuid } = req.body
  const sendErr = (message: string): void => done(null, false, { message })

  try {
    // validate email and password
    if (!RegExps.validEmail({ email })) {
      return sendErr('login.invalidEmail')
    }
    if (Objects.isEmpty(password.trim())) {
      return sendErr('login.noEmptyPassword')
    }

    // accept invitation
    if (invitationUuid) {
      return localAcceptInvitation({ done, req, sendErr })
    }

    // login
    return localLogin({ done, req, sendErr })
  } catch (e) {
    sendErr(`${'login.errorOccurred'}: ${e}`)
  }
}

export const localStrategy = (passport: PassportStatic): void => {
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
}
