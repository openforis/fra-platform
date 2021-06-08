// @ts-ignore
import * as camelize from 'camelize'
import * as R from 'ramda'

import { parseISO, isBefore } from 'date-fns'
import { isReviewer } from '@common/countryRole'
import * as db from '../../db/db'
import * as auditRepository from '../audit/auditRepository'
import { checkCountryAccess, checkReviewerCountryAccess, AccessControlException } from '../../utils/accessControl'

export const getIssueComments = (countryIso: any, section: any, user: any) =>
  db.pool
    .query(
      `
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
      issue i
    JOIN fra_comment c 
      ON (c.issue_id = i.id)
    JOIN fra_user u 
      ON (u.id = c.user_id)
    LEFT OUTER JOIN user_issue ui
      ON ui.user_id = $1
      AND ui.issue_id = i.id      
    WHERE 
      i.country_iso = $2 ${section ? 'AND i.section = $3 ' : ''}
    ORDER BY
      c.id  
  `,
      section ? [user.id, countryIso, section] : [user.id, countryIso]
    )
    .then((res: any) => camelize(res.rows))

export const getIssueCountryAndSection = (issueId: any) => {
  return db.pool
    .query(
      `
    SELECT i.country_iso, i.section FROM issue i 
    WHERE i.id = $1
  `,
      [issueId]
    )
    .then((res: any) => camelize(res.rows[0]))
}

export const getCommentCountryAndSection = (commentId: any) => {
  return db.pool
    .query(
      `
    SELECT i.country_iso, i.section FROM fra_comment c JOIN issue i ON (c.issue_id = i.id)
    WHERE c.id = $1
  `,
      [commentId]
    )
    .then((res: any) => camelize(res.rows[0]))
}

export const hasUnreadIssues = (user: any, issueComments: any) =>
  R.pipe(
    R.groupBy((comment: any) => comment.issueId),
    // @ts-ignore
    R.map((comments: any) => {
      const commentsByOthers = R.reject((c: any) => c.userId === user.id, comments)
      const last = R.last(commentsByOthers)
      const hasUnreadComments = last
        ? last.issueReadTime
          ? isBefore(parseISO(last.issueReadTime), parseISO(last.addedTime))
          : true
        : false
      return { hasUnreadComments }
    }),
    R.filter((issue: any) => issue.hasUnreadComments),
    R.isEmpty,
    R.not
    // @ts-ignore
  )(issueComments)

const _getIssuesSummary = (user: any, issueComments: any) =>
  R.pipe(R.last, R.defaultTo({}), (last: any) => ({
    issuesCount: issueComments.length,
    lastCommentUserId: last.userId,
    issueStatus: last.issueStatus,
    hasUnreadIssues: hasUnreadIssues(user, issueComments),
  }))(issueComments)

export const getIssuesSummary = (countryIso: any, section: any, targetParam: any, user: any, rejectResolved = false) =>
  getIssueComments(countryIso, section, user).then((issueComments: any) => {
    const target = targetParam && targetParam.split(',')

    const paramsMatch = (params: any) => target.every((el: any, i: any) => el === params[i])

    const summary = R.pipe(
      R.reject((i: any) => i.deleted),
      R.reject((i: any) => (rejectResolved ? i.issueStatus === 'resolved' : false)),
      R.filter((i: any) => (target ? paramsMatch(R.path(['target', 'params'], i)) : true)),
      // @ts-ignore
      R.partial(_getIssuesSummary, [user])
      // @ts-ignore
    )(issueComments)

    return summary
  })

export const getCountryIssuesSummary = (countryIso: any, user: any) =>
  getIssueComments(countryIso, null, user).then((issueComments: any) => {
    const summaries = R.pipe(
      R.reject((i: any) => i.deleted),
      R.reject((i: any) => i.issueStatus === 'resolved'),
      R.groupBy((i: any) => i.section),
      // @ts-ignore
      R.map(R.partial(_getIssuesSummary, [user]))
      // @ts-ignore
    )(issueComments)

    return summaries
  })

export const getIssuesByParam = (countryIso: any, section: any, paramPosition: any, paramValue: any) =>
  db.pool
    .query(
      `
    SELECT 
      i.id as issue_id, i.section, i.target, i.status
    FROM issue i
    WHERE i.country_iso = $1
    AND i.section = $2
    AND i.target #> '{params,${paramPosition}}' = '"${paramValue}"'
    AND i.id in (SELECT DISTINCT c.issue_id FROM fra_comment c WHERE c.deleted = false)`,
      [countryIso, section]
    )
    .then((res: any) => camelize(res.rows))

export const createIssueWithComment = (
  client: any,
  countryIso: any,
  section: any,
  target: any,
  userId: any,
  msg: any
) =>
  auditRepository.insertAudit(client, userId, 'createIssue', countryIso, section, { target }).then(() =>
    client
      .query(
        `
    INSERT INTO issue (country_iso, section, target, status) VALUES ($1, $2, $3, $4);
  `,
        [countryIso, section, target, 'opened']
      )
      .then((res: any) => client.query(`SELECT last_value FROM issue_id_seq`))
      .then((res: any) =>
        client.query(
          `
      INSERT INTO fra_comment (issue_id, user_id, message, status_changed)
      VALUES ($1, $2, $3, 'opened');
  `,
          [res.rows[0].last_value, userId, msg]
        )
      )
  )

export const checkIssueOpenedOrReviewer = (countryIso: any, status: any, user: any) => {
  if (status === 'resolved' && !isReviewer(countryIso, user))
    // @ts-ignore
    throw new AccessControlException('error.review.commentEnterResolvedIssue', { user: user.name })
}

export const createComment = (
  client: any,
  issueId: any,
  user: any,
  countryIso: any,
  section: any,
  msg: any,
  statusChanged: any
) =>
  auditRepository.insertAudit(client, user.id, 'createComment', countryIso, section, { issueId }).then(() =>
    client
      .query('SELECT country_iso, status FROM issue WHERE id = $1', [issueId])
      .then((res: any) => {
        const countryIso = res.rows[0].country_iso
        checkCountryAccess(countryIso, user)
        checkIssueOpenedOrReviewer(countryIso, res.rows[0].status, user)
      })
      .then(() =>
        client.query(
          `
      INSERT INTO fra_comment (issue_id, user_id, message, status_changed)
      VALUES ($1, $2, $3, $4);
     `,
          [issueId, user.id, msg, statusChanged]
        )
      )
      .then(() => client.query('UPDATE issue SET status = $1 WHERE id = $2', ['opened', issueId]))
  )

export const createIssueQueryPlaceholders = (issueIds: any) =>
  R.range(1, issueIds.length + 1)
    .map((i: any) => `$${i}`)
    .join(',')

export const deleteUserIssues = (client: any, issueIds: any) => {
  if (issueIds.length > 0) {
    return client.query(
      `DELETE from user_issue WHERE issue_id IN (${createIssueQueryPlaceholders(issueIds)})`,
      issueIds
    )
  }
  return Promise.resolve()
}

export const deleteIssuesByIds = (client: any, issueIds: any) => {
  if (issueIds.length > 0) {
    const issueIdQueryPlaceholders = createIssueQueryPlaceholders(issueIds)

    return client
      .query(`DELETE from fra_comment WHERE issue_id IN (${issueIdQueryPlaceholders})`, issueIds)
      .then(() => client.query(`DELETE from issue WHERE id IN (${issueIdQueryPlaceholders})`, issueIds))
  }
  return Promise.resolve()
}

export const deleteIssues = (client: any, countryIso: any, section: any, paramPosition: any, paramValue: any) =>
  getIssuesByParam(countryIso, section, paramPosition, paramValue)
    .then((res: any) => res.map((r: any) => r.issueId))
    .then((issueIds: any) => Promise.all([deleteUserIssues(client, issueIds), deleteIssuesByIds(client, issueIds)]))

export const markCommentAsDeleted = (client: any, countryIso: any, section: any, commentId: any, user: any) =>
  auditRepository.insertAudit(client, user.id, 'deleteComment', countryIso, section, { commentId }).then(() =>
    client
      .query('SELECT user_id FROM fra_comment WHERE id = $1', [commentId])
      .then((res: any) => res.rows[0].user_id)
      .then((userId: any) => {
        if (userId !== user.id)
          // @ts-ignore
          throw new AccessControlException('error.review.commentDeleteNotOwner', { user: user.name })
      })
      .then(() => client.query('UPDATE fra_comment SET deleted = $1 WHERE id = $2', [true, commentId]))
  )

export const markIssueAsResolved = (client: any, countryIso: any, section: any, issueId: any, user: any) =>
  auditRepository.insertAudit(client, user.id, 'markAsResolved', countryIso, section, { issueId }).then(() =>
    client
      .query('SELECT country_iso FROM issue WHERE id = $1', [issueId])
      .then((res: any) => checkReviewerCountryAccess(res.rows[0].country_iso, user))
      .then(() => createComment(client, issueId, user, countryIso, section, 'Marked as resolved', 'resolved'))
      .then(() => client.query('UPDATE issue SET status = $1 WHERE id = $2', ['resolved', issueId]))
  )

export const updateIssueReadTime = (issueId: any, user: any) =>
  db.pool
    .query(`SELECT id FROM user_issue WHERE user_id = $1 AND issue_id = $2`, [user.id, issueId])
    .then((res: any) =>
      res.rows.length > 0
        ? db.pool.query(`UPDATE user_issue SET read_time = $1 WHERE id = $2`, [
            new Date().toISOString(),
            res.rows[0].id,
          ])
        : db.pool.query(`INSERT INTO user_issue (user_id, issue_id, read_time) VALUES ($1,$2,$3)`, [
            user.id,
            issueId,
            new Date().toISOString(),
          ])
    )
