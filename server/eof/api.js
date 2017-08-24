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

module.exports.init = app => {
  app.post('/:section/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)
    const section = req.params.section
    const updates = []
    const persist = {
      'eof': fraRepository.persistEofValues,
      'foc': fraRepository.persistFocValues
    }[section]
    R.map(c => {
      updates.push(persist(req.params.countryIso, c.year, c))
    }, req.body.columns)

    Promise.all(updates)
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  // persists section fra values
  app.post('/:section/country/:countryIso/:year', (req, res) => {
    const section = req.params.section
    checkCountryAccessFromReqParams(req)

    const persist = {
          'eof': fraRepository.persistEofValues,
          'foc': fraRepository.persistFocValues
    }[section]

    persist(req.params.countryIso, req.params.year, req.body)
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/:section/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)

    const section = req.params.section
    const readFra = {
      'eof': fraRepository.readFraForestAreas,
      'foc': fraRepository.readFraForestCharacteristics
    }[section]
    const readOdp = {
      'eof': odpRepository.readEofOdps,
      'foc': odpRepository.readFocOdps
    }[section]

    const fra = readFra(req.params.countryIso)
    const odp = readOdp(req.params.countryIso)

    const defaultResponse = {
      'eof': () => forestAreaTableResponse.fra,
      'foc': () => focTableResponse.buildDefaultResponse(focTableResponse.defaultYears)
    }[section]

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

  app.post('/country/estimation/generateFraValues/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)
    const fra = fraRepository.readFraForestAreas(req.params.countryIso)
    const odp = odpRepository.readEofOdps(req.params.countryIso)
    const years = R.pipe(
      R.values,
      R.map((v) => v.year)
    )(forestAreaTableResponse.fra)

    estimationEngine
      .estimateAndPersistFraValues(req.params.countryIso, years)
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })
}
