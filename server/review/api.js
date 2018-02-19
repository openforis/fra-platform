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
      checkCountryAccessFromReqParams(req)

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

  app.get('/review/:countryIso/:section/summary', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const result = await reviewRepository.getIssuesSummary(req.params.countryIso, req.params.section, req.query.target, req.user)

      res.json(result)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post('/review/:countryIso/:section', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      await allowedToEditCommentsCheck(req.params.countryIso, req.user, req.params.section)
      const target = req.query.target ? req.query.target.split(',') : []
      await db.transaction(
        reviewRepository.createIssueWithComment,
        [req.params.countryIso, req.params.section, {params: target}, req.user.id, req.body.msg]
      )
      res.json({})
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.get('/review/:countryIso/:section', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const result = await reviewRepository.getIssueComments(req.params.countryIso, req.params.section, req.user)

      const target = req.query.target && req.query.target.split(',')
      const issues = R.filter(comment => R.pathEq(['target', 'params'], target, comment), result)

      if (issues.length > 0)
        await reviewRepository.updateIssueReadTime(issues[0].issueId, req.user)

      res.json(R.map(
        comment =>
          R.merge(R.omit('email', comment), // leave out email
            R.pipe( // calculate email hash for gravatar
              R.prop('email'),
              v => emailHash(v),
              h => ({hash: h})
            )(comment)
          )
        , issues))

    } catch (err) {
      sendErr(res, err)
    }
  })

  app.delete('/review/:countryIso/comments/:commentId', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const commentInfo = await reviewRepository.getCommentCountryAndSection(req.params.commentId)
      await allowedToEditCommentsCheck(commentInfo.countryIso, req.user, commentInfo.section)
      await db.transaction(
        reviewRepository.markCommentAsDeleted,
        [commentInfo.countryIso, commentInfo.section, req.params.commentId, req.user]
      )
      res.json({})
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post('/issue/markAsResolved', async (req, res) => {
    try {
      checkCountryAccessFromReqParams(req)

      const commentInfo = await reviewRepository.getIssueCountryAndSection(req.query.issueId)
      await allowedToEditCommentsCheck(commentInfo.countryIso, req.user, commentInfo.section)
      await db.transaction(reviewRepository.markIssueAsResolved, [commentInfo.countryIso, commentInfo.section, req.query.issueId, req.user])
      res.json({})
    } catch (err) {
      sendErr(res, err)
    }
  })
}
