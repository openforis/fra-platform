const passport = require('passport')
const userRepository = require('../user/userRepository')
const authConfig = require('./authConfig')
const { setLoggedInCookie } = require('./loggedInCookie')
const {sendErr} = require('../requestUtils')
const countryRepository = require('../country/countryRepository')

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
        if (err) {
          next(err)
        } else if (!user) {
          req.logout()
          setLoggedInCookie(res, false)
          res.redirect('/?u=1')
        } else {
          req.logIn(user, err => {
            if (err) {
              next(err)
            } else {
              countryRepository.getAllCountries().then(result => {
                setLoggedInCookie(res, true)
                res.redirect(`/#/country/${result.rows[0].countryIso}`)
              }).catch(err => sendErr(res, err))
            }
          })
        }
      })(req, res, next)

    })

  app.post('/auth/logout', (req, res) => {
    req.logout()
    setLoggedInCookie(res, false)
    res.json({})
  })
}
