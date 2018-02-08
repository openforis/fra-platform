const R = require('ramda')

const db = require('../db/db')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendErr} = require('../utils/requestUtils')
const reviewRepository = require('./reviewRepository')
const {emailHash} = require('../../common/userUtils')
const {allowedToEditCommentsCheck} = require('../assessment/assessmentEditAccessControl')

module.exports.init = app => {

  app.post('/review/:issueId', async (req, res) => {
    try {
      const commentInfo = await reviewRepository.getIssueCountryAndSection(req.params.issueId)
      await allowedToEditCommentsCheck(commentInfo.countryIso, req.user, commentInfo.section)
      await db.transaction(
        reviewRepository.createComment,
        [req.params.issueId, req.user, commentInfo.countryIso, commentInfo.section, req.body.msg, 'opened']
      )
      res.json({})
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/review/:countryIso/:section/summary', (req, res) => {
    checkCountryAccessFromReqParams(req)
    reviewRepository
      .getIssuesSummary(req.params.countryIso, req.params.section, req.query.target, req.user)
      .then(result => res.json(result))
      .catch(err => sendErr(res, err))
  })

  app.post('/review/:countryIso/:section', (req, res) => {
    checkCountryAccessFromReqParams(req)
    const target = req.query.target ? req.query.target.split(',') : []
    db.transaction(
      reviewRepository.createIssueWithComment,
      [req.params.countryIso, req.params.section, {params: target}, req.user.id, req.body.msg])
      .then(result => res.json({}))
      .catch(err => sendErr(res, err))
  })

  app.get('/review/:countryIso/:section', (req, res) => {
    checkCountryAccessFromReqParams(req)
    reviewRepository.getIssueComments(req.params.countryIso, req.params.section, req.user)
      .then(result => {
        const target = req.query.target && req.query.target.split(',')
        const issues = R.filter(comment => R.pathEq(['target', 'params'], target, comment), result)

        const sendResponse = () => res.json(R.map(
          comment =>
            R.merge(R.omit('email', comment), // leave out email
              R.pipe( // calculate email hash for gravatar
                R.prop('email'),
                v => emailHash(v),
                h => ({hash: h})
              )(comment)
            )
          , issues))

        issues.length > 0
          ? reviewRepository.updateIssueReadTime(issues[0].issueId, req.user).then(() => sendResponse())
          : sendResponse()

      })
      .catch(err => sendErr(res, err))
  })

  app.delete('/review/:countryIso/comments/:commentId', (req, res) => {
    reviewRepository.getCommentCountryAndSection(req.params.commentId).then(commentInfo => {
      db.transaction(reviewRepository.markCommentAsDeleted, [commentInfo.countryIso, commentInfo.section, req.params.commentId, req.user])
        .then(() => res.json({}))
        .catch(err => sendErr(res, err))
    })
  })

  app.post('/issue/markAsResolved', (req, res) => {
    reviewRepository.getIssueCountryAndSection(req.query.issueId).then(commentInfo => {
      db.transaction(reviewRepository.markIssueAsResolved, [commentInfo.countryIso, commentInfo.section, req.query.issueId, req.user])
        .then(() => res.json({}))
        .catch(err => sendErr(res, err))
    })
  })
}
