const R = require('ramda')
const Promise = require('bluebird')

const db = require('../db/db')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {fetchCollaborators} = require('./collaboratorsRepository')
const {sendErr, sendOk, serverUrl} = require('../utils/requestUtils')

module.exports.init = app => {

  // get collaborators
  app.get('/collaborators/:countryIso', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const countryIso = req.params.countryIso

      const collaborators = await fetchCollaborators(countryIso)

      res.json({collaborators})
    } catch (err) {
      sendErr(res, err)
    }
  })

}
