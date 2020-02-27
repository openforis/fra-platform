const camelize = require('camelize')
const db = require('../db/db')
const R = require('ramda')
const Promise = require('bluebird')
const auditRepository = require('./../audit/auditRepository')
const {checkCountryAccess, checkReviewerCountryAccess, AccessControlException} = require('../utils/accessControl')
const {isReviewer} = require('../../common/countryRole')
const {parseISO, isBefore} = require('date-fns')

const getIssueComments = (countryIso, section, user, schemaName = 'public') => {
  const tableNameIssue = `${schemaName}.issue`
  const tableNameFraComment = `${schemaName}.fra_comment`
  const tableNameFraUser = `${schemaName}.fra_user`
  const tableNameUserIssue = `${schemaName}.user_issue`

  return db.query(`
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
      to_char(c.added_time,'YYYY-MM-DD"T"HH24:MI:ssZ') as added_time,
      CASE
        WHEN ui.read_time IS NOT NULL THEN to_char(ui.read_time,'YYYY-MM-DD"T"HH24:MI:ssZ') 
        ELSE null
      END as issue_read_time  
    FROM 
      ${tableNameIssue} i
    JOIN ${tableNameFraComment} c 
      ON (c.issue_id = i.id)
    JOIN ${tableNameFraUser} u 
      ON (u.id = c.user_id)
    LEFT OUTER JOIN ${tableNameUserIssue} ui
      ON ui.user_id = $1
      AND ui.issue_id = i.id      
    WHERE 
      i.country_iso = $2 ${section ? 'AND i.section = $3 ' : ''}
    ORDER BY
      c.id  
  `, section ? [user.id, countryIso, section] : [user.id, countryIso])
    .then(res => camelize(res.rows))
}
module.exports.getIssueComments = getIssueComments


const getIssueCountryAndSection = (issueId) => {
  return db.query(`
    SELECT i.country_iso, i.section FROM issue i 
    WHERE i.id = $1
  `, [issueId]).then(res => camelize(res.rows[0]))
}
module.exports.getIssueCountryAndSection = getIssueCountryAndSection

const getCommentCountryAndSection = commentId => {
  return db.query(`
    SELECT i.country_iso, i.section FROM fra_comment c JOIN issue i ON (c.issue_id = i.id)
    WHERE c.id = $1
  `, [commentId]).then(res => camelize(res.rows[0]))
}
module.exports.getCommentCountryAndSection = getCommentCountryAndSection

const hasUnreadIssues = (user, issueComments) => R.pipe(
  R.groupBy(comment => comment.issueId),
  R.map(comments => {
    const commentsByOthers = R.reject(c => c.userId === user.id, comments)
    const last = R.last(commentsByOthers)
    const hasUnreadComments = last ? (last.issueReadTime ? isBefore(parseISO(last.issueReadTime), parseISO(last.addedTime)) : true) : false
    return {hasUnreadComments}
  }),
  R.filter(issue => issue.hasUnreadComments),
  R.isEmpty,
  R.not
)(issueComments)

const getIssuesSummary = (user, issueComments) => R.pipe(
  R.last,
  R.defaultTo({}),
  last => ({
    issuesCount: issueComments.length,
    lastCommentUserId: last.userId,
    issueStatus: last.issueStatus,
    hasUnreadIssues: hasUnreadIssues(user, issueComments)
  })
)(issueComments)

module.exports.getIssuesSummary = (countryIso, section, targetParam, user, rejectResolved = false, schemaName = 'public') =>
  getIssueComments(countryIso, section, user, schemaName)
    .then(issueComments => {
      const target = targetParam && targetParam.split(',')

      const paramsMatch = params => target.every((el, i) => el === params[i])

      const summary = R.pipe(
        R.reject(i => i.deleted),
        R.reject(i => rejectResolved ? i.issueStatus === 'resolved' : false),
        R.filter(i => target
          ? paramsMatch(R.path(['target', 'params'], i))
          : true),
        R.partial(getIssuesSummary, [user])
      )(issueComments)

      return summary
    })

module.exports.getCountryIssuesSummary = (countryIso, user) =>
  getIssueComments(countryIso, null, user)
    .then(issueComments => {
      const summaries = R.pipe(
        R.reject(i => i.deleted),
        R.reject(i => i.issueStatus === 'resolved'),
        R.groupBy(i => i.section),
        R.map(R.partial(getIssuesSummary, [user]))
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
  auditRepository.insertAudit(client, userId, 'createIssue', countryIso, section, {target})
    .then(() =>
      client.query(`
    INSERT INTO issue (country_iso, section, target, status) VALUES ($1, $2, $3, $4);
  `, [countryIso, section, target, 'opened'])
        .then(res => client.query(`SELECT last_value FROM issue_id_seq`))
        .then(res => client.query(`
      INSERT INTO fra_comment (issue_id, user_id, message, status_changed)
      VALUES ($1, $2, $3, 'opened');
  `, [res.rows[0].last_value, userId, msg]))
    )

const checkIssueOpenedOrReviewer = (countryIso, status, user) => {
  if (status === 'resolved' && !isReviewer(countryIso, user))
    throw new AccessControlException('error.review.commentEnterResolvedIssue', {user: user.name})
}

const createComment = (client, issueId, user, countryIso, section, msg, statusChanged) =>
  auditRepository.insertAudit(client, user.id, 'createComment', countryIso, section, {issueId})
    .then(() =>
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
    )

module.exports.createComment = createComment

const createIssueQueryPlaceholders = issueIds => R.range(1, issueIds.length + 1).map(i => '$' + i).join(',')

const deleteUserIssues = (client, issueIds) => {
  if (issueIds.length > 0) {
    return client.query(
      `DELETE from user_issue WHERE issue_id IN (${createIssueQueryPlaceholders(issueIds)})`,
      issueIds
    )
  } else
    return Promise.resolve()
}

const deleteIssuesByIds = (client, issueIds) => {
  if (issueIds.length > 0) {
    const issueIdQueryPlaceholders = createIssueQueryPlaceholders(issueIds)

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
    .then(issueIds =>
      Promise.all([
        deleteUserIssues(client, issueIds),
        deleteIssuesByIds(client, issueIds)
        ])
    )


module.exports.markCommentAsDeleted = (client, countryIso, section, commentId, user) =>
  auditRepository.insertAudit(client, user.id, 'deleteComment', countryIso, section, {commentId})
    .then(() =>
      client
        .query('SELECT user_id FROM fra_comment WHERE id = $1', [commentId])
        .then(res => res.rows[0].user_id)
        .then(userId => {
          if (userId !== user.id)
            throw new AccessControlException('error.review.commentDeleteNotOwner', {user: user.name})
        })
        .then(() => client.query('UPDATE fra_comment SET deleted = $1 WHERE id = $2', [true, commentId]))
    )

module.exports.markIssueAsResolved = (client, countryIso, section, issueId, user) =>
  auditRepository.insertAudit(client, user.id, 'markAsResolved', countryIso, section, {issueId})
    .then(() => client
      .query('SELECT country_iso FROM issue WHERE id = $1', [issueId])
      .then(res =>
        checkReviewerCountryAccess(res.rows[0].country_iso, user)
      )
      .then(() => createComment(client, issueId, user, countryIso, section, 'Marked as resolved', 'resolved'))
      .then(() => client.query('UPDATE issue SET status = $1 WHERE id = $2', ['resolved', issueId]))
    )

module.exports.updateIssueReadTime = (issueId, user) =>
  db
    .query(`SELECT id FROM user_issue WHERE user_id = $1 AND issue_id = $2`, [user.id, issueId])
    .then(res => res.rows.length > 0
      ? db.query(`UPDATE user_issue SET read_time = $1 WHERE id = $2`, [new Date().toISOString(), res.rows[0].id])
      : db.query(`INSERT INTO user_issue (user_id, issue_id, read_time) VALUES ($1,$2,$3)`, [user.id, issueId, new Date().toISOString()]))
