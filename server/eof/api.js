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
  app.post('/eof/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)
    const updates = []
    R.map(c => {
      updates.push(fraRepository.persistFraValues(req.params.countryIso, c.year, c))
    }, req.body.columns)

    Promise.all(updates)
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.post('/eof/country/:countryIso/:year', (req, res) => {
    checkCountryAccessFromReqParams(req)
    fraRepository.persistFraValues(req.params.countryIso, req.params.year, req.body)
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/eof/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)
    const fra = fraRepository.readFraForestAreas(req.params.countryIso)
    const odp = odpRepository.readEofOdps(req.params.countryIso)

    Promise.all([fra, odp])
      .then(result => {
        const forestAreas = R.pipe(
          R.merge(forestAreaTableResponse.fra),
          R.merge(result[1]),
          R.values,
          R.sort((a, b) => a.year === b.year ? (a.type < b.type ? -1 : 1) : a.year - b.year)
        )(result[0])
        return res.json({fra: forestAreas})
      })
      .catch(err => sendErr(res, err))
  })

  app.get('/foc/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)
    const fra = fraRepository.readFraForestCharacteristics(req.params.countryIso)
    const odp = odpRepository.readFocOdps(req.params.countryIso)

    Promise.all([fra, odp])
      .then(result => {
        const focs = R.pipe(
          R.merge(focTableResponse.buildDefaultResponse(focTableResponse.defaultYears)),
          R.merge(result[1]),
          R.values,
          R.sort((a, b) => a.year === b.year ? (a.type < b.type ? -1 : 1) : a.year - b.year)
        )(result[0])
        return res.json({fra: focs})
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
