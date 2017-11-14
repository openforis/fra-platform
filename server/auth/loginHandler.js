const express = require('express')
const {sendErr} = require('../utils/requestUtils')
const countryRepository = require('../country/countryRepository')
const db = require('../db/db')
const userRepository = require('../user/userRepository')

module.exports.init = app => {
  app.use('/login', async (req, res, next) => {
    try {
      if (req.user) {
        if (req.query.i) {
          await db.transaction(userRepository.addCountryRoleAndUpdateUserBasedOnInvitation, [req.user, req.query.i])
        }
        const defaultCountry = await countryRepository.getFirstAllowedCountry(req.user.roles)
        res.redirect(`/#/country/${defaultCountry.countryIso}`)
      } else {
        express.static(`${__dirname}/../../web-resources/login.html`)(req, res, next)
      }
    } catch (err) {
      sendErr(res, err)
    }
  })
}
