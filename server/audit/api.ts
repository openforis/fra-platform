const auditRepository = require('./auditRepository')
const {sendErr} = require('../utils/requestUtils')

const Auth = require('../auth/authApiMiddleware')

module.exports.init = app => {
  app.get('/audit/getLatestAuditLogTimestamp/:countryIso', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      const timeStamp = await auditRepository.getLastAuditTimeStampForSection(req.params.countryIso, req.query.section)

      res.json({timeStamp})
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/audit/getAuditFeed/:countryIso', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      const feed = await auditRepository.getAuditFeed(req.params.countryIso)

      res.json({feed})

    } catch (err) {
      sendErr(res, err)
    }
  })
}
