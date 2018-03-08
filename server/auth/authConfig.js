const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const LocalStrategy = require('passport-local')
const cookieParser = require('cookie-parser')

const userRepository = require('../user/userRepository')
const db = require('../db/db')

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

const localStrategyVerifyCallback = async (req, username, password, done) => {
  console.log('========== localStrategyVerifyCallback body ', req.body)
  console.log('========== localStrategyVerifyCallback username  ', username)
  console.log('========== localStrategyVerifyCallback password  ', password)
  done(null, false, {status: 'error', message: 'Invitation not found'})
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
