const passport = require('passport')
const userRepository = require('../user/userRepository')
const authConfig = require('./authConfig')

module.exports.init = app => {

  const verifyCallback = (accessToken, refreshToken, profile, done) =>
    userRepository
      .findUserByLoginEmails(profile.emails.map(e => e.value))
      .then(user => user ? done(null, user) : done(null, false, {message: 'User not authorized'}))

  authConfig.init(app, verifyCallback)

  const setLoggedInCookie = (res, value) => res.cookie('loggedIn', value, {maxAge: 30 * 24 * 60 * 60 * 1000})

  app.get('/auth/google',
    passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email']}))

  app.get('/auth/google/callback',
    (req, res, next) => {
      passport.authenticate('google', (err, user, info) => {
        if (err) return next(err)
        if (!user) {
          req.logout()
          console.log('=== ! user ')
          setLoggedInCookie(res, false)
          return res.redirect('/?u=1')
        }
        req.logIn(user, err => {
          if (err) return next(err)
          setLoggedInCookie(res, true)
          console.log('=== user ', user)
          return res.redirect('/#/country/ITA')
        })
      })(req, res, next)

    })

}
