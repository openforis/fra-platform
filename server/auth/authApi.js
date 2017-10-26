const passport = require('passport')
const authConfig = require('./authConfig')
const db = require('../db/db')
const userRepository = require('../user/userRepository')
const countryRepository = require('../country/countryRepository')
const {sendErr} = require('../utils/requestUtils')

const verifyCallback = (req, accessToken, refreshToken, profile, done) => {

  const userFetchCallback = user =>
    user ? done(null, user) : done(null, false, {message: 'User not authorized'})

  const invitationUUID = req.query.state
  if (invitationUUID)
    db.transaction(userRepository.authorizeUser, [invitationUUID, profile.emails[0].value])
      .then(userFetchCallback)
  else
    userRepository.findUserByLoginEmails(profile.emails.map(e => e.value.toLowerCase()))
      .then(userFetchCallback)
}

const authenticationFailed = (req, res) => {
  req.logout()
  res.redirect('/login?loginFailed=true')
}

const authenticationSuccessful = (req, user, next, res) => {
  req.logIn(user, err => {
    if (err) {
      next(err)
    } else {
      countryRepository.getFirstAllowedCountry(user.roles).then(defaultCountry => {
        // We have to explicitly save session and wait for saving to complete
        // because of the way chrome handles redirects (it doesn't read the whole response)
        // More here:
        // https://github.com/voxpelli/node-connect-pg-simple/issues/31#issuecomment-230596077
        req.session.save(() => {
          res.redirect(`/#/country/${defaultCountry.countryIso}`)
        })
      }).catch(err => sendErr(res, err))
    }
  })
}

module.exports.init = app => {
  authConfig.init(app, verifyCallback)

  app.get('/auth/google', (req, res) =>
    passport.authenticate('google',
      {scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'], state: req.query.i}
    )(req, res)
  )

  app.get('/auth/google/callback', (req, res, next) => {
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
    res.json({})
  })

}
