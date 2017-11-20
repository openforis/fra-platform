const fraRepository = require('./fraRepository')
const odpRepository = require('../odp/odpRepository')
const db = require('../db/db')
const os = require('os')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const {sendErr} = require('../utils/requestUtils')
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

const getFraValues = (section, countryIso) => {
  const readFra = fraReaders[section]

  const readOdp = odpReaders[section]
  const defaultResponse = defaultResponses[section]

  const fra = readFra(countryIso)
  const odp = readOdp(countryIso)

  return Promise.all([fra, odp])
    .then(result => {
      const fra = R.pipe(
        R.merge(defaultResponse()),
        R.merge(result[1]),
        R.values,
        R.sort((a, b) => a.year === b.year ? (a.type < b.type ? -1 : 1) : a.year - b.year)
      )(result[0])

      return {fra}
    })
}

module.exports.getFraValues = getFraValues

module.exports.init = app => {
  app.post('/nde/:section/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)
    db.transaction(auditRepository.insertAudit,
      [req.user.id, 'saveFraValues', req.params.countryIso, req.params.section])
    const section = req.params.section
    const updates = []
    const writer = fraWriters[section]

    R.map(c => {
      updates.push(writer(req.params.countryIso, c.year, c))
    }, req.body.columns)

    Promise.all(updates)
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  // persists section fra values
  app.post('/nde/:section/country/:countryIso/:year', (req, res) => {
    const section = req.params.section
    checkCountryAccessFromReqParams(req)
    db.transaction(auditRepository.insertAudit,
      [req.user.id, 'saveFraValues', req.params.countryIso, section])

    const writer = fraWriters[section]

    writer(req.params.countryIso, req.params.year, req.body)
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/nde/:section/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)

    getFraValues(req.params.section, req.params.countryIso)
      .then(fra => res.json(fra))
      .catch(err => sendErr(res, err))
  })

  app.post('/nde/:section/generateFraValues/:countryIso/:generateMethod', (req, res) => {

    checkCountryAccessFromReqParams(req)
    db.transaction(auditRepository.insertAudit,
      [req.user.id, 'generateFraValues', req.params.countryIso, req.params.section])
    const section = req.params.section
    const readOdp = odpReaders[section]
    const writer = fraWriters[section]
    const defaultResponse = defaultResponses[section]
    const fieldsToEstimate = {
      'extentOfForest': estimationEngine.eofFields,
      'forestCharacteristics': estimationEngine.focFields
    }[section]

    const years = R.pipe(
      R.values,
      R.map((v) => v.year)
    )(defaultResponse())

    const generateSpec = {
      method: req.params.generateMethod,
      ratePast: req.query.ratePast,
      rateFuture: req.query.rateFuture
    }

    estimationEngine
      .estimateAndWrite(
        readOdp,
        writer,
        fieldsToEstimate,
        req.params.countryIso,
        years,
        generateSpec
      )
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })
}
