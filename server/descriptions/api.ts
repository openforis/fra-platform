const db = require('../db/db')
const { sendErr, sendOk } = require('../utils/requestUtils')
const repository = require('./descriptionsRepository')
const auditRepository = require('./../audit/auditRepository')

const Auth = require('../auth/authApiMiddleware')
const VersionService = require('../versioning/service')

module.exports.init = app => {
  app.get('/country/descriptions/:countryIso/:section/:name', async (req, res) => {
    try {
      const schemaName = await VersionService.getDatabaseSchema(req)
      const result = await db.transaction(repository.readDescriptions, [
        req.params.countryIso,
        req.params.section,
        req.params.name,
        schemaName,
      ])

      res.json(result)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post('/country/descriptions/:countryIso/:section/:name', Auth.requireCountryEditPermission, async (req, res) => {
    const { countryIso, section, name } = req.params
    const { content } = req.body
    try {
      await db.transaction(auditRepository.insertAudit, [req.user.id, 'saveDescriptions', countryIso, section])
      await db.transaction(repository.persistDescriptions, [countryIso, section, name, content])

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })
}
