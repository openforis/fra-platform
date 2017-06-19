const fraRepository = require('./fraRepository')
const odpRepository = require('./odpRepository')
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

  app.get('/api/country/issue/:countryIso/:section', (req, res) => {
    issueRepository.getIssues(req.params.countryIso, req.params.section)
      .then(result => {
        const target =  req.query.target && req.query.target.split(',')
        const issues = R.map(issue => {
          const diff = R.pipe(R.path(['target', 'params']), R.difference(target))(issue)
          return R.isEmpty(diff) ? issue : []
        }, result)
        res.json(R.reject(R.isEmpty, issues))
      })
      .catch(err => sendErr(res, err))
  })
  app.post('/api/country/issue/:countryIso/:section', (req, res) => {
    const userId = req.session.loggedInUser.id
    const target = req.query.target ? req.query.target.split(',') : []
    db.transaction(
      issueRepository.createIssueWithComment,
      [req.params.countryIso, req.params.section, {params: target}, userId, req.body.msg])
      .then(result => res.json({}))
      .catch(err => sendErr(res, err))
  })
  app.post('/api/country/comment/:issueId', (req, res) => {
    const userId = req.session.loggedInUser.id
    db.transaction(issueRepository.createComment, [req.params.issueId, userId, req.body.msg, ''])
      .then(result => res.json({}))
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

  app.get('/api/country/originalDataPoint/:odpId', (req, res) => {
    odpRepository.getOdp(req.params.odpId)
      .then(resp => res.json(resp))
      .catch(err => sendErr(res, err))
  })

  app.delete('/api/country/originalDataPoint/:odpId', (req, res) => {
    db.transaction(odpRepository.deleteOdp, [req.params.odpId])
      .then(() => res.json({}))
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
      .estimateAndPersistFraValues(req.params.countryIso, years)
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/api/status/:countryIso', (req, res) => {
   const odpData = odpRepository.readOriginalDataPoints(req.params.countryIso, true)

    Promise.all([odpData]).then(result => {
      const odpStatus = {
        count: R.values(result[0]).length,
        errors: R.pipe( // if year not specified for a odp, raise error flag
          R.values,
          R.filter(R.pathEq(['year'], 0)),
          R.isEmpty,
          R.not)(result[0])
      }

      res.json({odpStatus})

    })
    .catch(err => sendErr(res, err))
  })
}
