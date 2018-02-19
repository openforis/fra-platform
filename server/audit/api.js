const R = require('ramda')
const auditRepository = require('./auditRepository')
const {sendErr} = require('../utils/requestUtils')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {emailHash} = require('../../common/userUtils')

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

      const hashedFeed = R.map(item => {
        const hash = emailHash(item.email)
        return {...item, hash}
      }, feed)

      res.json({feed: hashedFeed})

    } catch (err) {
      sendErr(res, err)
    }
  })
}
