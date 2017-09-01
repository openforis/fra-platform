const express = require('express')

module.exports.init = app => {
  app.use('/login', (req, res, next) => {
    if (req.user) {
      res.redirect(`/#/country/AFG`)
      //res.redirect(`/#/country/${defaultCountry.countryIso}`)
    } else {
      express.static(`${__dirname}/../../web-resources/login.html`)(req, res, next)
    }
  })
}
