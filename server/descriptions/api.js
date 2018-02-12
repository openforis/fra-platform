const db = require('../db/db')
const {sendErr, sendOk} = require('../utils/requestUtils')
const repository = require('./descriptionsRepository')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const auditRepository = require('./../audit/auditRepository')
const {allowedToEditDataCheck} = require('../assessment/assessmentEditAccessControl')

module.exports.init = app => {

  app.get('/country/descriptions/:countryIso/:section/:name', async (req, res) => {
      try {
        checkCountryAccessFromReqParams(req)

        const result = await db.transaction(repository.readDescriptions, [req.params.countryIso, req.params.section, req.params.name])

        res.json(result)
      } catch (err) {
        sendErr(res, err)
      }
    }
  )

  app.post('/country/descriptions/:countryIso/:section/:name', async (req, res) => {
      try {
        checkCountryAccessFromReqParams(req)
        await allowedToEditDataCheck(req.params.countryIso, req.user, req.params.section)

        await db.transaction(
          auditRepository.insertAudit,
          [req.user.id, 'saveDescriptions', req.params.countryIso, req.params.section]
        )
        await db.transaction(
          repository.persistDescriptions,
          [req.params.countryIso, req.params.section, req.params.name, req.body.content]
        )

        sendOk(res)
      } catch (err) {
        sendErr(res, err)
      }
    }
  )

}
