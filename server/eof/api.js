const eofRepository    = require('./repository')
const db               = require('../db/db')
const os               = require('os')
const Promise          = require('bluebird')
const fs               = Promise.promisifyAll(require('fs'))
const {sendErr}        = require('../requestUtils')
const R                = require('ramda')
const EstimationEngine = require('./estimation-engine')

const forestAreaTableResponse = require('./forestAreaTableResponse')

module.exports.init = app => {
  
  app.post('/api/country/:countryIso/:year', (req, res) => {
    eofRepository.persistFraForestArea(req.params.countryIso, req.params.year, req.body.forestArea)
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })
  
  app.get('/api/country/:countryIso', (req, res) => {
    const fra = eofRepository.readFraForestAreas(req.params.countryIso)
    const odp = eofRepository.readOriginalDataPoints(req.params.countryIso)
    
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
    eofRepository.getOdp(req.params.odpId)
      .then(resp =>
        res.json({odpId: resp.odp_id, forestArea: resp.forest_area, year: resp.year})
      )
      .catch(err => sendErr(res, err))
  })
  
  app.post('/api/country/originalDataPoint/draft/:countryIso', (req, res) => {
    const countryIso = req.params.countryIso
    db.transaction(eofRepository.saveDraft, [countryIso, req.body])
      .then(result => res.json(result))
      .catch(err => sendErr(res, err))
  })
  
  app.post('/api/country/originalDataPoint/draft/markAsActual/:opdId', (req, res) =>
    db.transaction(eofRepository.markAsActual, [req.params.opdId])
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  )
  
  app.get('/api/country/generateFraValues/:countryIso', (req, res) => {
    const years = [1990, 2000, 2010, 2015, 2020]
    
    EstimationEngine
      .estimateFraValues(req.params.countryIso, years)
      .then(() => res.json({}))
  })
  
}