const express = require('express')
const {sendErr} = require('../utils/requestUtils')
const countryRepository = require('../country/countryRepository')

module.exports.init = app => {
  app.use('/login', (req, res, next) => {
    if (req.user) {
      countryRepository.getFirstAllowedCountry(req.user.roles)
        .then(defaultCountry => {
          res.redirect(`/#/country/${defaultCountry.countryIso}`)
        })
        .catch(err => sendErr(res, err))
    } else {
      express.static(`${__dirname}/../../web-resources/login.html`)(req, res, next)
    }
  })
}
