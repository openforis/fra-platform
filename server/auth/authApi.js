const passport = require('passport')
const userRepository = require('../user/userRepository')
const authConfig = require('./authConfig')
const { setLoggedInCookie } = require('./loggedInCookie')

module.exports.init = app => {

  const verifyCallback = (accessToken, refreshToken, profile, done) =>
    userRepository
      .findUserByLoginEmails(profile.emails.map(e => e.value))
      .then(user => user ? done(null, user) : done(null, false, {message: 'User not authorized'}))

  authConfig.init(app, verifyCallback)

  app.get('/auth/google',
    passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email']}))

  app.get('/auth/google/callback',
    (req, res, next) => {
      passport.authenticate('google', (err, user) => {
        if (err) return next(err)

        if (!user) {
          req.logout()
          setLoggedInCookie(res, false)
          return res.redirect('/?u=1')
        }

        req.logIn(user, err => {
          if (err) return next(err)
          setLoggedInCookie(res, true)
          return res.redirect('/#/country/ITA')
        })
      })(req, res, next)

    })

}
