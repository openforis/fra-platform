const R = require('ramda')

const db = require('../db/db')
const {sendErr} = require('../utils/requestUtils')
const reviewRepository = require('./reviewRepository')
const {allowedToEditCommentsCheck} = require('../assessment/assessmentEditAccessControl')

const Auth = require('../auth/authApiMiddleware')

module.exports.init = app => {

  app.post('/review/:issueId', Auth.requireCountryEditPermission, async (req, res) => {
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

  app.get('/review/:countryIso/:section/summary', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      const result = await reviewRepository.getIssuesSummary(req.params.countryIso, req.params.section, req.query.target, req.user)
      res.json(result)
    } catch (err) {
      sendErr(res, err)
    }
  })

  app.post('/review/:countryIso/:section', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      // TODO: Should this be handled elsewhere?
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

  app.get('/review/:countryIso/:section',  Auth.requireCountryEditPermission, async (req, res) => {
    try {
      const result = await reviewRepository.getIssueComments(req.params.countryIso, req.params.section, req.user)

      const target = req.query.target && req.query.target.split(',')
      const issues = R.filter(comment => R.pathEq(['target', 'params'], target, comment), result)

      if (issues.length > 0)
        await reviewRepository.updateIssueReadTime(issues[0].issueId, req.user)

      // leave out email
      res.json(R.map(comment => R.omit('email', comment), issues))

    } catch (err) {
      sendErr(res, err)
    }
  })

  app.delete('/review/:countryIso/comments/:commentId', Auth.requireCountryEditPermission, async (req, res) => {
    try {
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

  app.post('/issue/markAsResolved', Auth.requireCountryEditPermission, async (req, res) => {
    try {
      const commentInfo = await reviewRepository.getIssueCountryAndSection(req.query.issueId)
      await allowedToEditCommentsCheck(commentInfo.countryIso, req.user, commentInfo.section)
      await db.transaction(reviewRepository.markIssueAsResolved, [commentInfo.countryIso, commentInfo.section, req.query.issueId, req.user])
      res.json({})
    } catch (err) {
      sendErr(res, err)
    }
  })
}
