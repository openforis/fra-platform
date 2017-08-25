const fraRepository = require('./fraRepository')
const odpRepository = require('../odp/odpRepository')
const db = require('../db/db')
const os = require('os')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const {sendErr} = require('../utils/requestUtils')
const R = require('ramda')
const estimationEngine = require('./estimationEngine')
const { checkCountryAccessFromReqParams } = require('../utils/accessControl')

const forestAreaTableResponse = require('./forestAreaTableResponse')
const focTableResponse = require('./focTableResponse')

const fraReaders = {
      'eof': fraRepository.readFraForestAreas,
      'foc': fraRepository.readFraForestCharacteristics
    }
const odpReaders = {
      'eof': odpRepository.readEofOdps,
      'foc': odpRepository.readFocOdps
    }
const fraWriters = {
      'eof': fraRepository.persistEofValues,
      'foc': fraRepository.persistFocValues
    }
const defaultResponses = {
      'eof': () => forestAreaTableResponse.fra,
      'foc': () => focTableResponse.buildDefaultResponse(focTableResponse.defaultYears)
    }

module.exports.init = app => {
  app.post('/nde/:section/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)
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

    const writer = fraWriters[section]

    writer(req.params.countryIso, req.params.year, req.body)
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/nde/:section/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)

    const section = req.params.section
    const readFra = fraReaders[section]
    const readOdp = odpReaders[section]
    const defaultResponse = defaultResponses[section]

    const fra = readFra(req.params.countryIso)
    const odp = readOdp(req.params.countryIso)

    Promise.all([fra, odp])
      .then(result => {
        const forestAreas = R.pipe(
          R.merge(defaultResponse()),
          R.merge(result[1]),
          R.values,
          R.sort((a, b) => a.year === b.year ? (a.type < b.type ? -1 : 1) : a.year - b.year)
        )(result[0])
        return res.json({fra: forestAreas})
      })
      .catch(err => sendErr(res, err))
  })

  app.post('/nde/:section/generateFraValues/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)
    const section = req.params.section
    const readOdp = odpReaders[section]
    const writer = fraWriters[section]
    const defaultResponse = defaultResponses[section]
    const fieldsToEstimate = {
      'eof': estimationEngine.eofFields,
      'foc': estimationEngine.focFields
    }[section]

    const years = R.pipe(
      R.values,
      R.map((v) => v.year)
    )(defaultResponse())

    estimationEngine
      .estimateAndWrite(readOdp, writer, fieldsToEstimate, req.params.countryIso, years)
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })
}
