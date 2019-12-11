const express = require('express')
const {sendErr, appUri} = require('../utils/requestUtils')
const countryRepository = require('../country/countryRepository')
const {fetchInvitation} = require('./../user/userRepository')

module.exports.init = app => {

  const loginPage = (req, res, next) => {
    express.static(`${__dirname}/../../dist/login.html`)(req, res, next)
  }

  const validInvitationUUID = async (uuid) => {
    const invitation = await fetchInvitation(uuid)
    return invitation ? true : false
  }

  app.use('/login', async (req, res, next) => {
    try {
      const invitationUUID = req.query.i
      const follow = invitationUUID
        ? await validInvitationUUID(invitationUUID)
        : true

      if (!follow)
        res.redirect('/login')
      else if (req.user) {
        if (invitationUUID) {
          req.logout()
          loginPage(req, res, next)
          return
        }
        const defaultCountry = await countryRepository.getFirstAllowedCountry(req.user.roles)
        res.redirect(`${appUri}/country/${defaultCountry.countryIso}/`)
      } else {
        loginPage(req, res, next)
      }
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.use('/resetPassword', loginPage)

}
