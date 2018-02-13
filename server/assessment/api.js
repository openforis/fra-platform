const db = require('../db/db')
const repository = require('./assessmentRepository')
const {sendErr, sendOk, serverUrl} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendAssessmentNotification} = require('./sendAssessmentNotification')

module.exports.init = app => {

  app.post('/assessment/:countryIso', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)
      const assessment = req.body
      const notifyUsers = req.query.notifyUsers

      const isStatusChange = await db.transaction(
        repository.changeAssessment,
        [
          req.params.countryIso,
          req.user,
          assessment
        ]
      )

      if (isStatusChange && notifyUsers) {
        await sendAssessmentNotification(req.params.countryIso, assessment, req.user, serverUrl(req))
      }

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

}
