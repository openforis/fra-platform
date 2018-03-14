const express = require('express')
const {sendErr} = require('../utils/requestUtils')
const countryRepository = require('../country/countryRepository')

module.exports.init = app => {

  const loginPage = (req, res, next) => {
    express.static(`${__dirname}/../../dist/login.html`)(req, res, next)
  }

  app.use('/login', async (req, res, next) => {
    try {
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
