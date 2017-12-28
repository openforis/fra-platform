const fraRepository = require('./fraRepository')
const odpRepository = require('../odp/odpRepository')
const db = require('../db/db')
const os = require('os')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const { sendErr, sendOk } = require('../utils/requestUtils')
const R = require('ramda')
const estimationEngine = require('./estimationEngine')
const { checkCountryAccessFromReqParams } = require('../utils/accessControl')
const auditRepository = require('./../audit/auditRepository')
const fraValueService = require('./fraValueService')
const defaultYears = require('./defaultYears')

const forestAreaTableResponse = require('./forestAreaTableResponse')
const focTableResponse = require('./focTableResponse')

const fraWriters = {
  'extentOfForest': fraRepository.persistEofValues,
  'forestCharacteristics': fraRepository.persistFocValues
}
const odpReaders = {
  'extentOfForest': odpRepository.readEofOdps,
  'forestCharacteristics': odpRepository.readFocOdps
}

module.exports.init = app => {
  app.post('/nde/:section/:countryIso', async (req, res) => {
    checkCountryAccessFromReqParams(req)
    try {
      await db.transaction(auditRepository.insertAudit,
        [req.user.id, 'saveFraValues', req.params.countryIso, req.params.section])
      const section = req.params.section
      const writer = fraWriters[section]
      const updates = R.map(c => writer(req.params.countryIso, c.year, c), req.body.columns)
      for (let update of updates) {
        await update
      }
      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

  // persists section fra values
  app.post('/nde/:section/country/:countryIso/:year', async (req, res) => {
    const section = req.params.section
    checkCountryAccessFromReqParams(req)
    try {
      await db.transaction(auditRepository.insertAudit,
        [req.user.id, 'saveFraValues', req.params.countryIso, section])
      const writer = fraWriters[section]
      await writer(req.params.countryIso, req.params.year, req.body)
      sendOk(res)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/nde/:section/:countryIso', async (req, res) => {
    checkCountryAccessFromReqParams(req)
    try {
      const fra = await fraValueService.getFraValues(req.params.section, req.params.countryIso)
      res.json(fra)
    } catch (err) { sendErr(res, err) }
  })

  app.post('/nde/:section/generateFraValues/:countryIso', (req, res) => {

    checkCountryAccessFromReqParams(req)
    db.transaction(auditRepository.insertAudit,
      [req.user.id, 'generateFraValues', req.params.countryIso, req.params.section])
    const section = req.params.section
    const readOdp = odpReaders[section]
    const writer = fraWriters[section]
    const generateSpec = req.body

    estimationEngine
      .estimateAndWrite(
        readOdp,
        writer,
        req.params.countryIso,
        defaultYears,
        generateSpec
      )
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })
}
