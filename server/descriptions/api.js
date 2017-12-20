const db = require('../db/db')
const {sendErr} = require('../utils/requestUtils')
const repository = require('./descriptionsRepository')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const auditRepository = require('./../audit/auditRepository')

module.exports.init = app => {

  app.get('/country/descriptions/:countryIso/:section/:name', (req, res) => {
      checkCountryAccessFromReqParams(req)
      db.transaction(repository.readDescriptions, [req.params.countryIso, req.params.section, req.params.name])
        .then(result => res.json(result))
        .catch(err => sendErr(res, err))
    }
  )

  app.post('/country/descriptions/:countryIso/:section/:name', (req, res) => {
      checkCountryAccessFromReqParams(req)
      db.transaction(auditRepository.insertAudit,
        [req.user.id, 'saveDescriptions', req.params.countryIso, req.params.section]
      ).then(
        () => db.transaction(
          repository.persistDescriptions,
          [req.params.countryIso, req.params.section, req.params.name, req.body.content]
        )
      )
      .then(result => res.json({}))
      .catch(err => sendErr(res, err))
    }
  )

}
