const fraRepository = require('./fraRepository')
const odpRepository = require('./odpRepository')
const db = require('../db/db')
const os = require('os')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const {sendErr} = require('../requestUtils')
const R = require('ramda')
const estimationEngine = require('./estimation-engine')

const forestAreaTableResponse = require('./forestAreaTableResponse')

module.exports.init = app => {

  app.post('/api/country/:countryIso/:year', (req, res) => {
    fraRepository.persistFraForestArea(req.params.countryIso, req.params.year, req.body.forestArea)
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/api/country/:countryIso', (req, res) => {
    const fra = fraRepository.readFraForestAreas(req.params.countryIso)
    const odp = odpRepository.readOriginalDataPoints(req.params.countryIso)

    Promise.all([fra, odp])
      .then(result => {
        const forestAreas = R.pipe(
          R.merge(forestAreaTableResponse.fra),
          R.merge(result[1]),
          R.values,
          R.sort((a, b) => a.year - b.year)
        )(result[0])
        return res.json({fra: forestAreas})
      })
      .catch(err => sendErr(res, err))
  })

  app.get('/api/country/originalDataPoint/:odpId', (req, res) => {
    odpRepository.getOdp(req.params.odpId)
      .then(resp => res.json(resp))
      .catch(err => sendErr(res, err))
  })

  app.post('/api/country/originalDataPoint/draft/:countryIso', (req, res) => {
    const countryIso = req.params.countryIso
    db.transaction(odpRepository.saveDraft, [countryIso, req.body])
      .then(result => res.json(result))
      .catch(err => sendErr(res, err))
  })

  app.post('/api/country/originalDataPoint/draft/markAsActual/:opdId', (req, res) =>
    db.transaction(odpRepository.markAsActual, [req.params.opdId])
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  )

  app.post('/api/country/estimation/generateFraValues/:countryIso', (req, res) => {
    const years = R.pipe(
      R.values,
      R.map((v) => v.year)
    )(forestAreaTableResponse.fra)

    estimationEngine
      .estimateFraValues(req.params.countryIso, years)
      .then(() => res.json({}))
  })

}
