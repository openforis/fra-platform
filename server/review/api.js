const R = require('ramda')

const db = require('../db/db')

const issueRepository = require('./../issueRepository')

module.exports.init = app => {

  app.get('/api/review/:countryIso/comments/count/:section', (req, res) => {
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

}
