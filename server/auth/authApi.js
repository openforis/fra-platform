const passport = require('passport')
const R = require('ramda')

const authConfig = require('./authConfig')
const countryRepository = require('../country/countryRepository')
const {sendErr} = require('../utils/requestUtils')
const {validEmail} = require('../../common/userUtils')

const {findLocalUserByEmail} = require('../user/userRepository')

const authenticationFailed = (req, res) => {
  req.logout()
  res.redirect('/login?loginFailed=true')
}

const authenticationSuccessful = (req, user, next, res, done) => {
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
          done(`/#/country/${defaultCountry.countryIso}`)
        })
      }).catch(err => sendErr(res, err))
    }
  })
}

module.exports.init = app => {
  authConfig.init(app)

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
        authenticationSuccessful(req, user, next, res,
          redirectUrl => res.redirect(redirectUrl)
        )
      }
    })(req, res, next)
  })

  app.post('/auth/logout', (req, res) => {
    req.logout()
    res.json({})
  })

  app.post('/auth/local/login', (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err)
      } else if (!user) {
        res.send(info)
      } else {
        authenticationSuccessful(req, user, next, res,
          redirectUrl => res.send({redirectUrl})
        )
      }
    })(req, res, next)
  })

  app.post('/auth/local/resetPassword', async (req, res) => {
    try {

      const email = req.body.email
      //validation
      if (R.isEmpty(R.trim(email)))
        res.send({error: 'Email cannot be empty'})
      else if (!validEmail({email}))
        res.send({error: 'Email not valid'})
      else {
        const user = await findLocalUserByEmail(email)
        if (!user) {
          res.send({error: 'We couldn\'t find any user matching this email.\nMake sure you have a valid FRA account.'})
        } else {
          //reset password
        }
      }
    } catch (err) {
      sendErr(res, err)
    }
  })

}
