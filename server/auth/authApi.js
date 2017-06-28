const passport = require('passport')
const userRepository = require('../user/userRepository')
const authConfig = require('./authConfig')

module.exports.init = app => {

  const verifyCallback = (accessToken, refreshToken, profile, done) =>
    userRepository
      .findUserByLoginEmails(profile.emails.map(e => e.value))
      .then(user => user ? done(null, user) : done(null, false, {message: 'User not authorized'}))

  authConfig.init(app, verifyCallback)

  app.get('/auth/google',
    passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email']}))

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/?u=1',
      successRedirect: '/#/country/ITA'
    })
  )

}
