const R = require('ramda')
const auditRepository = require('./auditRepository')
const {sendErr} = require('../utils/requestUtils')

module.exports.init = app =>
  app.get('/audit/getLatestAuditLogTimestamp/:countryIso', (req, res) => {
    auditRepository.getLastAuditTimeStampForSection(req.params.countryIso, req.query.section)
      .then(timeStamp => {
        res.json({timeStamp})
      })
      .catch(err => sendErr(res, err))
  })
