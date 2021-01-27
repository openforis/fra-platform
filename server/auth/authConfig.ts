// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'passport'.
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const LocalStrategy = require('passport-local')
const cookieParser = require('cookie-parser')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'bcrypt'.
const bcrypt = require('bcrypt')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userReposi... Remove this comment to see the full error message
const userRepository = require('../user/userRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validEmail... Remove this comment to see the full error message
const { validEmail, validPassword } = require('../../common/userUtils')

const passwordHash = async (password: any) => await bcrypt.hash(password, 10)

const googleStrategyVerifyCallback = async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
  const userFetchCallback = (user: any) =>
    user ? done(null, user) : done(null, false, { message: 'User not authorized' })

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
    done(null, false, { message: `Error occurred: ${e}` })
  }
}

const localStrategyVerifyCallback = async (req: any, email: any, password: any, done: any) => {
  const sendResp = (user: any, message: any) => (user ? done(null, user) : done(null, false, { message }))

  try {
    const { invitationUUID } = req.body

    // accepting invitation
    if (invitationUUID) {
      const invitation = await userRepository.fetchInvitation(invitationUUID)
      const password2 = req.body.password2 || ''
      // validating invitation
      if (!invitation) {
        sendResp(null, 'Invitation not found')
      } else {
        const user = await userRepository.findUserByEmail(email)
        if (user) {
          // existing user
          if (R.isEmpty(R.trim(password))) sendResp(null, 'Password cannot be empty')
          else {
            const validatedUser = await userRepository.findUserByEmailAndPassword(email, password)
            if (validatedUser) {
              const hash = await passwordHash(password)
              const acceptedUser = await db.transaction(userRepository.acceptInvitationLocalUser, [
                invitationUUID,
                hash,
              ])
              // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
              sendResp(acceptedUser)
            } else {
              sendResp(
                null,
                "We couldn't find any user matching these credentials.\nMake sure you have a valid FRA account."
              )
            }
          }
        } else {
          // new user
          if (R.isEmpty(R.trim(password)) || R.isEmpty(R.trim(password2))) sendResp(null, 'Passwords cannot be empty')
          else if (R.trim(password) !== R.trim(password2)) sendResp(null, "Passwords don't match")
          else if (!validPassword(password))
            sendResp(
              null,
              'Password must contain six characters or more and have at least one lower case and one upper case alphabetical character and one number'
            )
          else {
            const hash = await passwordHash(password)
            const user = await db.transaction(userRepository.acceptInvitationLocalUser, [invitationUUID, hash])
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            sendResp(user)
          }
        }
      }
      // login
    } else if (!validEmail({ email })) sendResp(null, 'Email not valid')
    else if (R.isEmpty(R.trim(password))) sendResp(null, 'Password cannot be empty')
    else {
      const user = await userRepository.findUserByEmailAndPassword(email, password)
      user
        ? // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          sendResp(user)
        : sendResp(
            null,
            "We couldn't find any user matching these credentials.\nMake sure you have a valid FRA account."
          )
    }
  } catch (e) {
    console.log('Error occurred while authenticating', e)
    sendResp(null, `Error occurred: ${e}`)
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'init'.
const init = (app: any) => {
  app.use(cookieParser())
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.FRA_GOOGLE_CLIENT_ID,
        clientSecret: process.env.FRA_GOOGLE_CLIENT_SECRET,
        callbackURL: `/auth/google/callback`,
        passReqToCallback: true,
      },
      googleStrategyVerifyCallback
    )
  )

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

module.exports = {
  init,
  passwordHash,
}
