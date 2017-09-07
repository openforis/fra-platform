const camelize = require('camelize')
const db = require('../db/db')
const R = require('ramda')
const Promise = require('bluebird')
const {checkCountryAccess, checkReviewerCountryAccess, AccessControlException} = require('../utils/accessControl')
const {isReviewer} = require('../../common/countryRole')

const getIssueComments = (countryIso, section) =>
  db.query(`
    SELECT 
      i.id as issue_id, i.target, i.status as issue_status, i.section,
      u.email, u.name as username,
      c.id as comment_id, c.user_id,
      CASE 
        WHEN c.deleted = true THEN ''
        ELSE c.message 
      END as message, 
      c.status_changed,
      c.deleted,
      to_char(c.added_time,'YYYY-MM-DD"T"HH24:MI:ssZ') as added_time
    FROM 
      issue i
    JOIN fra_comment c 
      ON (c.issue_id = i.id)
    JOIN fra_user u 
      ON (u.id = c.user_id)
    WHERE 
      i.country_iso = $1 ${section ? 'AND i.section = $2 ' : ''}
    ORDER BY
      c.id  
  `, section ? [countryIso, section] : [countryIso])
    .then(res => camelize(res.rows))

module.exports.getIssueComments = getIssueComments

const getIssuesSummary = issueComments => R.pipe(
  R.last,
  R.defaultTo({}),
  last => ({
    issuesCount: issueComments.length,
    lastCommentUserId: last.userId,
    issueStatus: last.issueStatus
  })
)(issueComments)

module.exports.getIssuesSummary = (countryIso, section, targetParam, rejectResolved = false) =>
  getIssueComments(countryIso, section)
    .then(issueComments => {
      const target = targetParam && targetParam.split(',')

      const paramsMatch = params => target.every((el, i) => el === params[i])

      const summary = R.pipe(
        R.reject(i => i.deleted),
        R.reject(i => rejectResolved ? i.issueStatus === 'resolved' : false),
        R.filter(i => target
          ? paramsMatch(R.path(['target', 'params'], i))
          : true),
        getIssuesSummary
      )(issueComments)

      return summary
    })

module.exports.getCountryIssuesSummary = countryIso =>
  getIssueComments(countryIso)
    .then(issueComments => {
      const summaries = R.pipe(
        R.reject(i => i.deleted),
        R.reject(i => i.issueStatus === 'resolved'),
        R.groupBy(i => i.section),
        R.map(getIssuesSummary)
      )(issueComments)

      return summaries
    })

const getIssuesByParam = (countryIso, section, paramPosition, paramValue) =>
  db.query(`
    SELECT 
      i.id as issue_id, i.section, i.target, i.status
    FROM issue i
    WHERE i.country_iso = $1
    AND i.section = $2
    AND i.target #> '{params,${paramPosition}}' = '"${paramValue}"'
    AND i.id in (SELECT DISTINCT c.issue_id FROM fra_comment c WHERE c.deleted = false)`
    , [countryIso, section])
    .then(res => camelize(res.rows))

module.exports.getIssuesByParam = getIssuesByParam

module.exports.createIssueWithComment = (client, countryIso, section, target, userId, msg) =>
  client.query(`
    INSERT INTO issue (country_iso, section, target, status) VALUES ($1, $2, $3, $4);
  `, [countryIso, section, target, 'opened'])
    .then(res => client.query(`SELECT last_value FROM issue_id_seq`))
    .then(res => client.query(`
      INSERT INTO fra_comment (issue_id, user_id, message, status_changed)
      VALUES ($1, $2, $3, 'opened');
  `, [res.rows[0].last_value, userId, msg]))

const checkIssueOpenedOrReviewer = (countryIso, status, user) => {
  if (status === 'resolved' && !isReviewer(countryIso, user))
    throw new AccessControlException('error.review.commentEnterResolvedIssue', {user: user.name})
}

const createComment = (client, issueId, user, msg, statusChanged) =>
  client
    .query('SELECT country_iso, status FROM issue WHERE id = $1', [issueId])
    .then(res => {
      const countryIso = res.rows[0].country_iso
      checkCountryAccess(countryIso, user)
      checkIssueOpenedOrReviewer(countryIso, res.rows[0].status, user)
    })
    .then(() => client.query(`
      INSERT INTO fra_comment (issue_id, user_id, message, status_changed)
      VALUES ($1, $2, $3, $4);
     `, [issueId, user.id, msg, statusChanged]))
    .then(() => client.query('UPDATE issue SET status = $1 WHERE id = $2', ['opened', issueId]))

module.exports.createComment = createComment

const deleteIssuesByIds = (client, issueIds) => {
  if (issueIds.length > 0) {
    const issueIdQueryPlaceholders = R.range(1, issueIds.length + 1).map(i => '$' + i).join(',')

    return client
      .query(`DELETE from fra_comment WHERE issue_id IN (${issueIdQueryPlaceholders})`, issueIds)
      .then(() =>
        client.query(`DELETE from issue WHERE id IN (${issueIdQueryPlaceholders})`, issueIds)
      )
  } else
    return Promise.resolve()
}

module.exports.deleteIssuesByIds = deleteIssuesByIds

module.exports.deleteIssues = (client, countryIso, section, paramPosition, paramValue) =>
  getIssuesByParam(countryIso, section, paramPosition, paramValue)
    .then(res => res.map(r => r.issueId))
    .then(issueIds => deleteIssuesByIds(client, issueIds))

module.exports.markCommentAsDeleted = (client, commentId, user) =>
  client
    .query('SELECT user_id FROM fra_comment WHERE id = $1', [commentId])
    .then(res => res.rows[0].user_id)
    .then(userId => {
      if (userId !== user.id)
        throw new AccessControlException('error.review.commentDeleteNotOwner', {user: user.name})
    })
    .then(() => client.query('UPDATE fra_comment SET deleted = $1 WHERE id = $2', [true, commentId]))

module.exports.markIssueAsResolved = (client, issueId, user) =>
  client
    .query('SELECT country_iso FROM issue WHERE id = $1', [issueId])
    .then(res => checkReviewerCountryAccess(res.rows[0].country_iso, user))
    .then(() => createComment(client, issueId, user, 'Marked as resolved', 'resolved'))
    .then(() => client.query('UPDATE issue SET status = $1 WHERE id = $2', ['resolved', issueId]))

module.exports.updateIssueReadTime = (issueId, user) =>
  db
    .query(`SELECT id FROM user_issue WHERE user_id = $1 AND issue_id = $2`, [user.id, issueId])
    .then(res => res.rows.length > 0
      ? db.query(`UPDATE user_issue SET read_time = $1 WHERE id = $2`, [new Date().toISOString(), res.rows[0].id])
      : db.query(`INSERT INTO user_issue (user_id, issue_id, read_time) VALUES ($1,$2,$3)`, [user.id, issueId, new Date().toISOString()]))
