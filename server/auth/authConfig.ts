import * as R from 'ramda'
import * as passport from 'passport'
import * as GoogleStrategy from 'passport-google-oauth'
import * as passportLocal from 'passport-local'
import * as cookieParser from 'cookie-parser'
import * as bcrypt from 'bcrypt'

import * as userRepository from '../user/userRepository'
import * as db from '../db/db'
import { validEmail, validPassword } from '../../common/userUtils'

export const passwordHash = async (password: any) => await bcrypt.hash(password, 10)

export const googleStrategyVerifyCallback = async (
  req: any,
  accessToken: any,
  refreshToken: any,
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
    done(null, false, { message: `${'login.errorOccured'}: ${e}` })
  }
}

export const localStrategyVerifyCallback = async (req: any, email: any, password: any, done: any) => {
  const sendResp = (user: any, message?: any) => (user ? done(null, user) : done(null, false, { message }))

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
          if (R.isEmpty(R.trim(password))) sendResp(null, 'login.noEmptyPassword')
          else {
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
          if (R.isEmpty(R.trim(password)) || R.isEmpty(R.trim(password2))) sendResp(null, 'Passwords cannot be empty')
          else if (R.trim(password) !== R.trim(password2)) sendResp(null, "Passwords don't match")
          else if (!validPassword(password)) sendResp(null, 'login.passwordError')
          else {
            const hash = await passwordHash(password)
            const user = await db.transaction(userRepository.acceptInvitationLocalUser, [invitationUUID, hash])
            sendResp(user)
          }
        }
      }
      // login
    } else if (!validEmail({ email })) sendResp(null, 'login.invalidEmail')
    else if (R.isEmpty(R.trim(password))) sendResp(null, 'login.noEmptyPassword')
    else {
      const user = await userRepository.findUserByEmailAndPassword(email, password)
      user ? sendResp(user) : sendResp(null, 'login.noMatchingUser')
    }
  } catch (e) {
    console.log('Error occurred while authenticating', e)
    sendResp(null, `${'login.errorOccured'}: ${e}`)
  }
}

export const init = (app: any) => {
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
}

export default {
  init,
  passwordHash,
}
