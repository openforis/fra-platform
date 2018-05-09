const R = require('ramda')
const Promise = require('bluebird')

const db = require('../db/db')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {fetchCollaboratorsCountryAccess, persistCollaboratorCountryAccess} = require('./collaboratorsRepository')
const {sendErr, sendOk, serverUrl} = require('../utils/requestUtils')

module.exports.init = app => {

  // get collaborators country access
  app.get('/collaboratorCountryAccess/:countryIso/all', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const countryIso = req.params.countryIso

      const collaborators = await fetchCollaboratorsCountryAccess(countryIso)

      res.json({collaborators})
    } catch (err) {
      sendErr(res, err)
    }
  })

  // save collaborator country access access
  app.post('/collaboratorCountryAccess/:countryIso', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const countryIso = req.params.countryIso
      const collaboratorTableAccess = req.body

      const collaborators = await db.transaction(persistCollaboratorCountryAccess, [req.user, countryIso, collaboratorTableAccess])

      res.json({collaborators})
    } catch (err) {
      sendErr(res, err)
    }
  })

}
