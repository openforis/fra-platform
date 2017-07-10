const R = require('ramda')

const db = require('../db/db')
const issueRepository = require('./../issueRepository')
const {sendErr} = require('../requestUtils')

module.exports.init = app => {

  app.post('/review/:issueId', (req, res) => {
    const userId = req.session.passport.user.id
    db.transaction(issueRepository.createComment, [req.params.issueId, userId, req.body.msg, ''])
      .then(result => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/review/:countryIso/:section/count', (req, res) => {
    issueRepository.getIssues(req.params.countryIso, req.params.section)
      .then(result => {
        const target = req.query.target && req.query.target.split(',')
        const issues = R.map(issue => {
          const diff = R.pipe(R.path(['target', 'params']), R.difference(target))(issue)
          return R.isEmpty(diff) ? issue : []
        }, result)
        res.json({count: R.pipe(R.reject(R.isEmpty), R.length)(issues)})
      })
      .catch(err => sendErr(res, err))
  })

  app.post('/review/:countryIso/:section', (req, res) => {
    const userId =  req.session.passport.user.id
    const target = req.query.target ? req.query.target.split(',') : []
    db.transaction(
      issueRepository.createIssueWithComment,
      [req.params.countryIso, req.params.section, {params: target}, userId, req.body.msg])
      .then(result => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/review/:countryIso/:section', (req, res) => {
    issueRepository.getIssues(req.params.countryIso, req.params.section)
      .then(result => {
        const target = req.query.target && req.query.target.split(',')
        const issues = R.map(issue => {
          const diff = R.pipe(R.path(['target', 'params']), R.difference(target))(issue)
          return R.isEmpty(diff) ? issue : []
        }, result)
        res.json(R.reject(R.isEmpty, issues))
      })
      .catch(err => sendErr(res, err))
  })
}
