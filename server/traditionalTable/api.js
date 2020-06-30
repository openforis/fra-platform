const db = require('../db/db')
const repository = require('./traditionalTableRepository')
const { sendErr, sendOk } = require('../utils/requestUtils')

const Auth = require('../auth/authApiMiddleware')
const VersionService = require('../versioning/service')

module.exports.init = (app) => {
  app.post('/traditionalTable/:countryIso/:tableSpecName', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      const {
        user,
        body,
        params: { countryIso, tableSpecName },
      } = req

      await db.transaction(repository.save, [user, countryIso, tableSpecName, body])

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/traditionalTable/:assessmentType/:countryIso/:tableSpecName', async (req, res) => {
    try {
      const {
        params: { assessmentType, countryIso, tableSpecName },
      } = req
      const schemaName = assessmentType === 'panEuropean' ? 'pan_european' : await VersionService.getDatabaseSchema(req)
      const result = await repository.read(countryIso, tableSpecName, schemaName)
      res.json(result)
    } catch (err) {
      sendErr(res, err)
    }
  })
}
