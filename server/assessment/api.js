const db = require('../db/db')
const repository = require('./assessmentRepository')
const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

module.exports.init = app => {
  app.post('/assessment/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)
    const assessment = req.body
    db.transaction(
        repository.changeAssessment,
        [
          req.params.countryIso,
          req.user,
          assessment
        ]
      )
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })
}
