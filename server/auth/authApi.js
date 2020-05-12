const passport = require('passport')
const R = require('ramda')

const db = require('./../db/db')
const authConfig = require('./authConfig')
const countryRepository = require('../country/countryRepository')
const { sendErr, serverUrl, appUri } = require('../utils/requestUtils')
const { validEmail, validPassword } = require('../../common/userUtils')

const { findLocalUserByEmail, findUserById, fetchInvitation, findUserByEmail } = require('../user/userRepository')
const { createResetPassword, findResetPassword, changePassword } = require('../user/userResetPasswordRepository')
const { sendResetPasswordEmail } = require('./resetPassword')

const Auth = require('./authApiMiddleware')

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
          done(`${appUri}/${defaultCountry.countryIso}/`)
        })
      }).catch(err => sendErr(res, err))
    }
  })
}

module.exports.init = app => {
  authConfig.init(app)

  app.get('/auth/invitation/:uuid', async (req, res) => {
    try {
      const invitation = await fetchInvitation(req.params.uuid, '')
      if (invitation) {
        const user = await findUserByEmail(invitation.email)
        res.json({ invitation, user })
      }
    } catch (err) {
      sendErr(res, err)
    }
  })

  // login / logout apis

  app.get('/auth/google', (req, res) =>
    passport.authenticate('google',
      { scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'], state: req.query.i }
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
          redirectUrl => res.send({ redirectUrl })
        )
      }
    })(req, res, next)
  })

  // reset / change passwords apis

  app.post('/auth/local/resetPassword', Auth.requireCountryEditPermission, async (req, res) => {
    try {

      const email = req.body.email
      //validation
      if (R.isEmpty(R.trim(email)))
        res.send({ error: 'Email cannot be empty' })
      else if (!validEmail({ email }))
        res.send({ error: 'Email not valid' })
      else {
        const user = await findLocalUserByEmail(email)
        if (!user) {
          res.send({ error: 'We couldn\'t find any user matching this email.\nMake sure you have a valid FRA account.' })
        } else {
          //reset password
          const resetPassword = await db.transaction(createResetPassword, [user.id])
          const url = serverUrl(req)

          await sendResetPasswordEmail(user, url, resetPassword.uuid)
          res.send({ message: `The request to reset your password has been successfully submitted.\nYou'll be shortly receiving an email with instructions` })
        }
      }
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/auth/local/resetPassword/:uuid', async (req, res) => {
    try {

      const resetPassword = await db.transaction(findResetPassword, [req.params.uuid])
      if (resetPassword) {
        const user = await findUserById(resetPassword.userId)
        res.json({ ...resetPassword, user })
      } else {
        res.json(null)
      }
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post('/auth/local/changePassword', Auth.requireCountryEditPermission, async (req, res) => {
    try {

      const sendResp = (error = null, message = null) =>
        res.json({ error, message })

      const { uuid, userId, password, password2 } = req.body
      if (R.isEmpty(R.trim(password)) || R.isEmpty(R.trim(password2)))
        sendResp('Passwords cannot be empty')
      else if (R.trim(password) !== R.trim(password2))
        sendResp('Passwords don\'t match')
      else if (!validPassword(password))
        sendResp('Password must contain six characters or more and have at least one lower case and one upper case alphabetical character and one number')
      else {
        const hash = await authConfig.passwordHash(password)
        const changed = await db.transaction(changePassword, [uuid, userId, hash])
        changed
          ? sendResp(null, 'Password has been changed')
          : sendResp('Ooops. It looks like your request is not longer valid.')
      }

    } catch (err) {
      sendErr(res, err)
    }

  })
}
