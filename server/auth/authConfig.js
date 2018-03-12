const R = require('ramda')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const LocalStrategy = require('passport-local')
const cookieParser = require('cookie-parser')

const bcrypt = require('bcrypt')

const userRepository = require('../user/userRepository')
const db = require('../db/db')
const {validEmail} = require('../../common/userUtils')

const googleStrategyVerifyCallback = async (req, accessToken, refreshToken, profile, done) => {

  const userFetchCallback = user =>
    user ? done(null, user) : done(null, false, {message: 'User not authorized'})

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
    done(null, false, {message: 'Error occurred: ' + e})
  }
}

const localStrategyVerifyCallback = async (req, email, password, done) => {
  const sendResp = (user, message) =>
    user ? done(null, user) : done(null, false, {message})

  // at least 6 chars, 1 lower case, 1 upper case and 1 number
  const passwordRegex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})`)

  try {
    const invitationUUID = req.body.invitationUUID
    if (invitationUUID) {
      const password2 = req.body.password2
      //accepting invitation
      const invitation = await userRepository.fetchInvitation(invitationUUID)
      // validating invitation
      if (!invitation)
        sendResp(null, 'Invitation not found')
      else if (R.isEmpty(R.trim(password)) || R.isEmpty(R.trim(password2)))
        sendResp(null, 'Passwords cannot be empty')
      else if (!passwordRegex.test(password))
        sendResp(null, 'Password must contain six characters or more and have at least one lower case and one upper case alphabetical character and one number')
      else if (R.trim(password) !== R.trim(password2))
        sendResp(null, 'Passwords don\'t match')
      else {
        const hash = await bcrypt.hash(password, 10)
        const user = await db.transaction(userRepository.acceptInvitationLocalUser, [invitationUUID, hash])
        sendResp(user)
      }

    } else {
      // login
      if (!validEmail({email}))
        sendResp(null, 'Email not valid')
      else if (R.isEmpty(R.trim(password)))
        sendResp(null, 'Password cannot be empty')
      else {
        const user = await userRepository.findUserByEmailAndPassword(email, password)
        user
          ? sendResp(user)
          : sendResp(null, 'We couldn\'t find any user matching this email and password. Make sure you have a valid FRA account.')
      }
    }
  } catch (e) {
    console.log('Error occurred while authenticating', e)
    sendResp(null, 'Error occurred: ' + e)
  }
}

module.exports.init = (app) => {

  app.use(cookieParser())
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new GoogleStrategy({
      clientID: process.env.FRA_GOOGLE_CLIENT_ID,
      clientSecret: process.env.FRA_GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true
    },
    googleStrategyVerifyCallback
  ))

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    localStrategyVerifyCallback
  ))

  passport.serializeUser((user, done) => done(null, user.id))

  passport.deserializeUser((userId, done) =>
    userRepository.findUserById(userId)
      .then(user => done(null, user))
  )

}
