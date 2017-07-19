const fraRepository = require('./fraRepository')
const odpRepository = require('../odp/odpRepository')
const reviewRepository = require('../review/reviewRepository')
const db = require('../db/db')
const os = require('os')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const {sendErr} = require('../utils/requestUtils')
const R = require('ramda')
const estimationEngine = require('./estimationEngine')
const { checkCountryAccess } = require('../utils/accessControl')

const forestAreaTableResponse = require('./forestAreaTableResponse')

module.exports.init = app => {
  app.post('/eof/:countryIso', (req, res) => {
    checkCountryAccess(req.params.countryIso, req)
    const updates = []
    R.map(c => {
      updates.push(fraRepository.persistFraValues(req.params.countryIso, c.year, c))
    }, req.body.columns)

    Promise.all(updates)
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.post('/country/:countryIso/:year', (req, res) => {
    checkCountryAccess(req.params.countryIso, req)
    fraRepository.persistFraValues(req.params.countryIso, req.params.year, req.body)
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/country/:countryIso', (req, res) => {
    checkCountryAccess(req.params.countryIso, req)
    const fra = fraRepository.readFraForestAreas(req.params.countryIso)
    const odp = odpRepository.readOriginalDataPoints(req.params.countryIso)

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

  app.post('/country/estimation/generateFraValues/:countryIso', (req, res) => {
    checkCountryAccess(req.params.countryIso, req)
    const years = R.pipe(
      R.values,
      R.map((v) => v.year)
    )(forestAreaTableResponse.fra)

    estimationEngine
      .estimateAndPersistFraValues(req.params.countryIso, years)
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/nav/status/:countryIso', (req, res) => {
    checkCountryAccess(req.params.countryIso, req)
    const odpData = odpRepository.listAndValidateOriginalDataPoints(req.params.countryIso)
    const reviewStatus = reviewRepository.allIssues(req.params.countryIso)

    // in future we certainly will need the Promise.all here wink wink
    Promise.all([odpData, reviewStatus]).then(([odps, reviewResult]) => {
      const odpStatus = {
        count: odps.length,
        errors: R.filter(o => !o.validationStatus.valid, odps).length !== 0,
      }

      res.json(R.merge({reviewStatus: reviewResult}, {odpStatus}))
    })
      .catch(err => sendErr(res, err))
  })

}
