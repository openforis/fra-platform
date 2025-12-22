import { PassportStatic } from 'passport'
import passportLocal, { VerifyFunctionWithRequest } from 'passport-local'

import { Objects } from 'utils/objects'
import { RegExps } from 'utils/regExps'

import { localAcceptInvitation } from 'server/api/auth/strategy/_local/acceptInvitation'
import { localChangePassword } from 'server/api/auth/strategy/_local/changePassword'
import { localLogin } from 'server/api/auth/strategy/_local/login'

const localStrategyVerifyCallback: VerifyFunctionWithRequest = (req, email, password, done): void | Promise<void> => {
  const { invitationUuid, resetPasswordUuid } = req.body
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

    // change password
    if (resetPasswordUuid) {
      return localChangePassword({ done, req, sendErr })
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
