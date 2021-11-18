import * as passport from 'passport'
import * as GoogleStrategy from 'passport-google-oauth'
import * as passportLocal from 'passport-local'
import * as cookieParser from 'cookie-parser'

import { validEmail, validPassword } from '@common/userUtils'
import { Objects } from '@core/utils'
import { User } from '@core/auth'
import { passwordHash } from './utils/passwordHash'
import * as userRepository from '../../repository/user/_legacy_userRepository'
import * as db from '../../db/db_deprecated'

const googleStrategyVerifyCallback = async (
  req: any,
  _accessToken: any,
  _refreshToken: any,
  profile: any,
  done: any
) => {
  const userFetchCallback = (user: any) =>
    user ? done(null, user) : done(null, false, { message: 'login.notAuthorized' })

  try {
    const invitationUuid = req.query.state
    const loginEmail = profile.emails[0].value.toLowerCase()

    if (invitationUuid) {
      const user = await db.transaction(userRepository.acceptInvitation, [invitationUuid, loginEmail])
      userFetchCallback(user)
    } else {
      const user = await userRepository.findUserByLoginEmail(loginEmail)
      userFetchCallback(user)
    }
  } catch (e) {
    console.log('Error occurred while authenticating', e)
    done(null, false, { message: `${'login.errorOccurred'}: ${e}` })
  }
}

const localStrategyVerifyCallback = async (req: any, email: any, password: any, done: any) => {
  const sendResp = (user: User, message?: any) => (user ? done(null, user) : done(null, false, { message }))

  try {
    const { invitationUUID } = req.body

    // accepting invitation
    if (invitationUUID) {
      const invitation = await userRepository.fetchInvitation(invitationUUID)
      const password2 = req.body.password2 || ''
      // validating invitation
      if (!invitation) {
        sendResp(null, 'login.noInvitation')
      } else {
        const user = await userRepository.findUserByEmail(email)
        if (user) {
          // existing user
          if (Objects.isEmpty(password.trim())) {
            sendResp(null, 'login.noEmptyPassword')
          } else {
            const validatedUser = await userRepository.findUserByEmailAndPassword(email, password)
            if (validatedUser) {
              const hash = await passwordHash(password)
              const acceptedUser = await db.transaction(userRepository.acceptInvitationLocalUser, [
                invitationUUID,
                hash,
              ])
              sendResp(acceptedUser)
            } else {
              sendResp(null, 'login.noMatchingUser')
            }
          }
        } else {
          // new user
          if (Objects.isEmpty(password.trim()) || Objects.isEmpty(password2.trim())) {
            sendResp(null, 'Passwords cannot be empty')
          } else if (password.trim() !== password2.trim()) {
            sendResp(null, "Passwords don't match")
          } else if (!validPassword(password)) {
            sendResp(null, 'login.passwordError')
          } else {
            const hash = await passwordHash(password)
            const _user = await db.transaction(userRepository.acceptInvitationLocalUser, [invitationUUID, hash])
            sendResp(_user)
          }
        }
      }
      // login
    } else if (!validEmail({ email })) {
      sendResp(null, 'login.invalidEmail')
    } else if (Objects.isEmpty(password.trim())) {
      sendResp(null, 'login.noEmptyPassword')
    } else {
      const user = await userRepository.findUserByEmailAndPassword(email, password)
      if (user) {
        sendResp(user)
      } else {
        sendResp(null, 'login.noMatchingUser')
      }
    }
  } catch (e) {
    console.log('Error occurred while authenticating', e)
    sendResp(null, `${'login.errorOccurred'}: ${e}`)
  }
}

export const AuthConfig = {
  init: (app: any) => {
    app.use(cookieParser())
    app.use(passport.initialize())
    app.use(passport.session())

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

    passport.serializeUser((user: any, done: any) => done(null, user.id))

    passport.deserializeUser((userId: any, done: any) =>
      userRepository.findUserById(userId).then((user: any) => done(null, user))
    )
  },
}
