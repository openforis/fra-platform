// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'passport'.
const passport = require('passport')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')
const authConfig = require('./authConfig')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'countryRep... Remove this comment to see the full error message
const countryRepository = require('../country/countryRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const { sendErr, serverUrl, appUri } = require('../utils/requestUtils')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validEmail... Remove this comment to see the full error message
const { validEmail, validPassword } = require('../../common/userUtils')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'findLocalU... Remove this comment to see the full error message
const { findLocalUserByEmail, findUserById, fetchInvitation, findUserByEmail } = require('../user/userRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'createRese... Remove this comment to see the full error message
const { createResetPassword, findResetPassword, changePassword } = require('../user/userResetPasswordRepository')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendResetP... Remove this comment to see the full error message
const { sendResetPasswordEmail } = require('./resetPassword')

const authenticationFailed = (req: any, res: any) => {
  req.logout()
  res.redirect('/login?loginFailed=true')
}

const authenticationSuccessful = (req: any, user: any, next: any, res: any, done: any) => {
  req.logIn(user, (err: any) => {
    if (err) {
      next(err)
    } else {
      countryRepository
        .getFirstAllowedCountry(user.roles)
        .then((defaultCountry: any) => {
          // We have to explicitly save session and wait for saving to complete
          // because of the way chrome handles redirects (it doesn't read the whole response)
          // More here:
          // https://github.com/voxpelli/node-connect-pg-simple/issues/31#issuecomment-230596077
          req.session.save(() => {
            done(`${appUri}`)
          })
        })
        .catch((err: any) => sendErr(res, err))
    }
  })
}

module.exports.init = (app: any) => {
  authConfig.init(app)

  app.get('/auth/invitation/:uuid', async (req: any, res: any) => {
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

  app.get('/auth/google', (req: any, res: any) =>
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'],
      state: req.query.i,
    })(req, res)
  )

  app.get('/auth/google/callback', (req: any, res: any, next: any) => {
    passport.authenticate('google', (err: any, user: any) => {
      if (err) {
        next(err)
      } else if (!user) {
        authenticationFailed(req, res)
      } else {
        authenticationSuccessful(req, user, next, res, (redirectUrl: any) => res.redirect(redirectUrl))
      }
    })(req, res, next)
  })

  app.post('/auth/logout', (req: any, res: any) => {
    req.logout()
    res.json({})
  })

  app.post('/auth/local/login', (req: any, res: any, next: any) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        res.send(info)
      } else {
        authenticationSuccessful(req, user, next, res, (redirectUrl: any) => res.send({ redirectUrl }))
      }
    })(req, res, next)
  })

  // reset / change passwords apis

  app.post('/auth/local/resetPassword', async (req: any, res: any) => {
    try {
      const { email } = req.body
      // validation
      if (R.isEmpty(R.trim(email))) res.send({ error: 'Email cannot be empty' })
      else if (!validEmail({ email })) res.send({ error: 'Email not valid' })
      else {
        const user = await findLocalUserByEmail(email)
        if (!user) {
          res.send({ error: "We couldn't find any user matching this email.\nMake sure you have a valid FRA account." })
        } else {
          // reset password
          const resetPassword = await db.transaction(createResetPassword, [user.id])
          const url = serverUrl(req)

          await sendResetPasswordEmail(user, url, resetPassword.uuid)
          res.send({
            message: `The request to reset your password has been successfully submitted.\nYou'll be shortly receiving an email with instructions`,
          })
        }
      }
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/auth/local/resetPassword/:uuid', async (req: any, res: any) => {
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

  app.post('/auth/local/changePassword', async (req: any, res: any) => {
    try {
      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'error' implicitly has an 'any' type.
      const sendResp = (error = null, message = null) => res.json({ error, message })

      const { uuid, userId, password, password2 } = req.body
      if (R.isEmpty(R.trim(password)) || R.isEmpty(R.trim(password2))) sendResp('Passwords cannot be empty')
      else if (R.trim(password) !== R.trim(password2)) sendResp("Passwords don't match")
      else if (!validPassword(password))
        sendResp(
          'Password must contain six characters or more and have at least one lower case and one upper case alphabetical character and one number'
        )
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
