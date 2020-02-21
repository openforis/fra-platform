const R = require('ramda')

const db = require('../db/db')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendErr, sendOk} = require('../utils/requestUtils')

const fraRepository = require('./fraRepository')
const odpRepository = require('../odp/odpRepository')
const auditRepository = require('./../audit/auditRepository')
const estimationEngine = require('./estimationEngine')
const fraValueService = require('./fraValueService')

const defaultYears = require('./defaultYears')

const Auth = require('../auth/authApiMiddleware')

const fraWriters = {
  'extentOfForest': fraRepository.persistEofValues,
  'forestCharacteristics': fraRepository.persistFocValues
}
const odpReaders = {
  'extentOfForest': odpRepository.readEofOdps,
  'forestCharacteristics': odpRepository.readFocOdps
}

module.exports.init = app => {

  app.post('/nde/:section/:countryIso', Auth.requireCountryEditPermission, async (req, res) => {
    const section = req.params.section
    const countryIso = req.params.countryIso
    try {
      await db.transaction(
        auditRepository.insertAudit,
        [req.user.id, 'saveFraValues', countryIso, req.params.section]
      )

      const writer = fraWriters[section]
      const updates = R.map(c => writer(countryIso, c.year, c), req.body.columns)
      for (let update of updates) {
        await update
      }

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

  // persists section fra values
  app.post('/nde/:section/country/:countryIso/:year', Auth.requireCountryEditPermission, async (req, res) => {
    const section = req.params.section
    const countryIso = req.params.countryIso
    try {

      await db.transaction(
        auditRepository.insertAudit,
        [req.user.id, 'saveFraValues', countryIso, section]
      )

      const writer = fraWriters[section]
      await writer(countryIso, req.params.year, req.body)

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/nde/:section/:countryIso', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)
      const fra = await fraValueService.getFraValues(req.params.section, req.params.countryIso)
      res.json(fra)
    } catch (err) { sendErr(res, err) }
  })

  app.post('/nde/:section/generateFraValues/:countryIso',  Auth.requireCountryEditPermission, async (req, res) => {
    const section = req.params.section
    const countryIso = req.params.countryIso

    try {

      db.transaction(
        auditRepository.insertAudit,
        [req.user.id, 'generateFraValues', countryIso, section]
      )

      const readOdp = odpReaders[section]
      const writer = fraWriters[section]
      const generateSpec = req.body

      await estimationEngine.estimateAndWrite(
        readOdp,
        writer,
        countryIso,
        defaultYears,
        generateSpec
      )

      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })
}
