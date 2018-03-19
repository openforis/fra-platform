const express = require('express')
const {sendErr} = require('../utils/requestUtils')
const countryRepository = require('../country/countryRepository')
const {fetchInvitation} = require('./../user/userRepository')

module.exports.init = app => {

  const loginPage = (req, res, next) => {
    express.static(`${__dirname}/../../dist/login.html`)(req, res, next)
  }

  const verifyInvitationUUID = async (req, res) => {
    const invitation = await fetchInvitation(req.query.i)
    if (!invitation)
      res.redirect('/login')
  }

  app.use('/login', async (req, res, next) => {
    try {
      if (req.query.i)
        await verifyInvitationUUID(req, res)

      if (req.user) {
        if (req.query.i) {
          req.logout()
          loginPage(req, res, next)
          return
        }
        const defaultCountry = await countryRepository.getFirstAllowedCountry(req.user.roles)
        res.redirect(`/#/country/${defaultCountry.countryIso}`)
      } else {
        loginPage(req, res, next)
      }
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.use('/resetPassword', loginPage)

}
