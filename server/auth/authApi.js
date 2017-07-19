const passport = require('passport')
const userRepository = require('../user/userRepository')
const authConfig = require('./authConfig')
const { setLoggedInCookie } = require('./loggedInCookie')
const {sendErr} = require('../utils/requestUtils')
const countryRepository = require('../country/countryRepository')

const verifyCallback = (accessToken, refreshToken, profile, done) =>
  userRepository
    .findUserByLoginEmails(profile.emails.map(e => e.value))
    .then(user => user ? done(null, user) : done(null, false, {message: 'User not authorized'}))

const authenticationFailed = (req, res) => {
  req.logout()
  setLoggedInCookie(res, false)
  res.redirect('/?u=1')
}

const authenticationSuccessful = (req, user, next, res) => {
  req.logIn(user, err => {
    console.log('req.login')
    if (err) {
      console.log('req.login error')
      next(err)
    } else {
      console.log('req.login getting allowed countries')
      countryRepository.getAllowedCountries(user.roles).then(result => {
        setLoggedInCookie(res, true)
        console.log('sending redirect')
        res.redirect(`/#/country/${result.rows[0].countryIso}`)
        console.log('after redirect')
      }).catch(err => sendErr(res, err))
    }
  })
}

module.exports.init = app => {
  authConfig.init(app, verifyCallback)

  app.get('/auth/google',
    passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email']}))

  app.get('/auth/google/callback',
    (req, res, next) => {
      passport.authenticate('google', (err, user) => {
        if (err) {
          next(err)
        } else if (!user) {
          authenticationFailed(req, res)
        } else {
          authenticationSuccessful(req, user, next, res)
        }
      })(req, res, next)
    })

  app.post('/auth/logout', (req, res) => {
    req.logout()
    setLoggedInCookie(res, false)
    res.json({})
  })
}
