const fraRepository = require('./fraRepository')
const odpRepository = require('../odp/odpRepository')
const issueRepository = require('./../issueRepository')
const db = require('../db/db')
const os = require('os')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const {sendErr} = require('../requestUtils')
const R = require('ramda')
const estimationEngine = require('./estimationEngine')

const forestAreaTableResponse = require('./forestAreaTableResponse')

module.exports.init = app => {

  app.post('/api/eof/:countryIso', (req, res) => {
    const updates = []
    R.map(c => {
      updates.push(fraRepository.persistFraValues(req.params.countryIso, c.year, c))
    }, req.body.columns)

    Promise.all(updates)
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.post('/api/country/:countryIso/:year', (req, res) => {
    fraRepository.persistFraValues(req.params.countryIso, req.params.year, req.body)
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
          R.sort((a, b) => a.year === b.year ? (a.type < b.type ? -1 : 1) : a.year - b.year)
        )(result[0])
        return res.json({fra: forestAreas})
      })
      .catch(err => sendErr(res, err))
  })

  app.post('/api/country/estimation/generateFraValues/:countryIso', (req, res) => {
    const years = R.pipe(
      R.values,
      R.map((v) => v.year)
    )(forestAreaTableResponse.fra)

    estimationEngine
      .estimateAndPersistFraValues(req.params.countryIso, years)
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/api/nav/status/:countryIso', (req, res) => {
   const odpData = odpRepository.listOriginalDataPoints(req.params.countryIso, true)

    const yearsValid = R.pipe( // if year not specified for a odp, raise error flag
          R.values,
          R.filter(R.pathEq(['year'], 0)),
          R.isEmpty
    )
    const percentagesValid = R.pipe( // if total percentages of odp go over 100, raise error flag
      R.values,
      R.filter(R.pipe(R.prop('totalPercentage'), R.lt(100))),
      R.isEmpty
    )

    // in future we certainly will need the Promise.all here wink wink
    Promise.all([odpData]).then(([odpResult]) => {
      const odpStatus = {
        count: R.values(odpResult).length,
        errors: R.contains(false, [yearsValid(odpResult), percentagesValid(odpResult)])
      }
      res.json({odpStatus})
    })
    .catch(err => sendErr(res, err))
  })

}
