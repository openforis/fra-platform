const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const cookieParser = require('cookie-parser')

module.exports.init = (app, verifyCallback) => {

  app.use(cookieParser())
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new GoogleStrategy({
      clientID: process.env.FRA_GOOGLE_CLIENT_ID,
      clientSecret: process.env.FRA_GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    verifyCallback
  ))

  passport.serializeUser((user, done) => done(null, user))

  passport.deserializeUser((user, done) => done(null, user))

}
