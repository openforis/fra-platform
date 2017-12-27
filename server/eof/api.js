const fraRepository = require('./fraRepository')
const odpRepository = require('../odp/odpRepository')
const db = require('../db/db')
const os = require('os')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const {sendErr, sendOk} = require('../utils/requestUtils')
const R = require('ramda')
const estimationEngine = require('./estimationEngine')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const auditRepository = require('./../audit/auditRepository')

const forestAreaTableResponse = require('./forestAreaTableResponse')
const focTableResponse = require('./focTableResponse')

const fraReaders = {
  'extentOfForest': fraRepository.readFraForestAreas,
  'forestCharacteristics': fraRepository.readFraForestCharacteristics
}
const odpReaders = {
  'extentOfForest': odpRepository.readEofOdps,
  'forestCharacteristics': odpRepository.readFocOdps
}
const fraWriters = {
  'extentOfForest': fraRepository.persistEofValues,
  'forestCharacteristics': fraRepository.persistFocValues
}
const defaultResponses = {
  'extentOfForest': () => forestAreaTableResponse.fra,
  'forestCharacteristics': () => focTableResponse.buildDefaultResponse(focTableResponse.defaultYears)
}

const getFraValues = async (section, countryIso) => {
  const readFra = fraReaders[section]

  const readOdp = odpReaders[section]
  const defaultResponse = defaultResponses[section]

  const fra = await readFra(countryIso)
  const odp = await readOdp(countryIso)
  const result = R.pipe(
    R.merge(defaultResponse()),
    R.merge(odp),
    R.values,
    R.sort((a, b) => a.year === b.year ? (a.type < b.type ? -1 : 1) : a.year - b.year)
  )(fra)
  return {fra: result}
}

module.exports.getFraValues = getFraValues

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
      const fra = await getFraValues(req.params.section, req.params.countryIso)
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
    const defaultResponse = defaultResponses[section]

    const years = R.pipe(
      R.values,
      R.map((v) => v.year)
    )(defaultResponse())
    const generateSpec = req.body

    estimationEngine
      .estimateAndWrite(
        readOdp,
        writer,
        req.params.countryIso,
        years,
        generateSpec
      )
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })
}
