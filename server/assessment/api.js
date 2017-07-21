const db = require('../db/db')
const repository = require('./assessmentRepository')
const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

module.exports.init = app => {
  app.post('/assessment/status/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)
    db.transaction(repository.changeAssessmentStatus, [req.params.countryIso, req.query.assessmentType, req.query.status])
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })
}
