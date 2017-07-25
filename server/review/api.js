const crypto = require('crypto')
const R = require('ramda')

const db = require('../db/db')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendErr} = require('../utils/requestUtils')
const reviewRepository = require('./reviewRepository')

module.exports.init = app => {

  app.post('/review/:issueId', (req, res) => {
    const user = req.session.passport.user
    db.transaction(reviewRepository.createComment, [req.params.issueId, user, req.body.msg, ''])
      .then(result => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/review/:countryIso/:section/count', (req, res) => {
    checkCountryAccessFromReqParams(req)
    reviewRepository.getIssueComments(req.params.countryIso, req.params.section)
      .then(result => {
        const target = req.query.target && req.query.target.split(',')
        const issues = R.map(issue => {
          const diff = R.pipe(R.path(['target', 'params']), R.difference(target))(issue)
          return R.isEmpty(diff) ? issue : []
        }, result)
        res.json({
          count: R.pipe(
            R.filter(i => !i.deleted),
            R.reject(R.isEmpty),
            R.length)(issues)
        })
      })
      .catch(err => sendErr(res, err))
  })

  app.post('/review/:countryIso/:section', (req, res) => {
    checkCountryAccessFromReqParams(req)
    const userId = req.session.passport.user.id
    const target = req.query.target ? req.query.target.split(',') : []
    db.transaction(
      reviewRepository.createIssueWithComment,
      [req.params.countryIso, req.params.section, {params: target}, userId, req.body.msg])
      .then(result => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/review/:countryIso/:section', (req, res) => {
    checkCountryAccessFromReqParams(req)
    reviewRepository.getIssueComments(req.params.countryIso, req.params.section)
      .then(result => {
        const target = req.query.target && req.query.target.split(',')
        const issues = R.map(issue => {
          const diff = R.pipe(R.path(['target', 'params']), R.difference(target))(issue)
          return R.isEmpty(diff) ? issue : []
        }, result)
        res.json(
          R.pipe(
            R.reject(R.isEmpty),
            R.map(
              comment =>
                R.merge(R.omit('email', comment), // leave out email
                  R.pipe( // calculate email hash for gravatar
                    R.prop('email'),
                    v => crypto.createHash('md5').update(v).digest('hex'),
                    h => ({hash: h})
                  )(comment)
                )
            )
          )(issues)
        )
      })
      .catch(err => sendErr(res, err))
  })

  app.delete('/review/:countryIso/comments/:commentId', (req, res) =>
    db
      .transaction(reviewRepository.markCommentAsDeleted, [req.params.commentId])
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  )

  app.post('/issue/markAsResolved', (req, res) => {
    //TODO access control check based on user role
    checkCountryAccessFromReqParams(req)
    db.transaction(reviewRepository.markIssueAsResolved, [req.query.issueId, req.query.userId])
      .then(() => res.json({}))
      .catch(err => sendErr(res, err))
  })
}
