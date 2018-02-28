const auditRepository = require('./auditRepository')
const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

module.exports.init = app => {
  app.get('/audit/getLatestAuditLogTimestamp/:countryIso', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const timeStamp = await auditRepository.getLastAuditTimeStampForSection(req.params.countryIso, req.query.section)

      res.json({timeStamp})
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/audit/getAuditFeed/:countryIso', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const feed = await auditRepository.getAuditFeed(req.params.countryIso)

      res.json({feed})

    } catch (err) {
      sendErr(res, err)
    }
  })
}
