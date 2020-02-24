const db = require('../db/db')
const {sendErr, sendOk} = require('../utils/requestUtils')
const repository = require('./descriptionsRepository')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const auditRepository = require('./../audit/auditRepository')

const Auth = require('../auth/authApiMiddleware')

module.exports.init = app => {

  app.get('/country/descriptions/:countryIso/:section/:name', Auth.requireCountryEditPermission, async (req, res) => {
      try {
        const result = await db.transaction(repository.readDescriptions, [req.params.countryIso, req.params.section, req.params.name])

        res.json(result)
      } catch (err) {
        sendErr(res, err)
      }
    }
  )

  app.post('/country/descriptions/:countryIso/:section/:name', Auth.requireCountryEditPermission, async (req, res) => {
      const countryIso = req.params.countryIso
      const section = req.params.section
      try {
        await db.transaction(
          auditRepository.insertAudit,
          [req.user.id, 'saveDescriptions', countryIso, section]
        )
        await db.transaction(
          repository.persistDescriptions,
          [countryIso, section, req.params.name, req.body.content]
        )

        sendOk(res)
      } catch (err) {
        sendErr(res, err)
      }
    }
  )

}
