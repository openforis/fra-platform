const db = require('../db/db')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {persistCollaboratorCountryAccess} = require('./collaboratorsRepository')

const {sendErr} = require('../utils/requestUtils')

module.exports.init = app => {

  // save collaborator country access access
  app.post('/collaboratorCountryAccess/:countryIso', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const countryIso = req.params.countryIso
      const collaboratorTableAccess = req.body

      await db.transaction(persistCollaboratorCountryAccess, [req.user, countryIso, collaboratorTableAccess])

      res.json({})
    } catch (err) {
      sendErr(res, err)
    }
  })

}
