// @ts-ignore
import * as camelize from 'camelize'
import * as db from '../../../server/db/db_deprecated'

export const insertAudit = async (
  client: any,
  userId: any,
  message: any,
  countryIso: any,
  section: any,
  target: { [key: string]: any } | null = null
) => {
  const userResult = await client.query('SELECT name, email, login_email FROM fra_user WHERE id = $1', [userId])
  // Temporary fix for 2 different dbs (pg, pg-promise)
  const _userResult = Array.isArray(userResult) ? userResult : userResult.rows
  if (_userResult.length !== 1) throw new Error(`User ID query resulted in ${userResult.rows.length} rows`)
  const user = camelize(_userResult[0])
  if (countryIso) {
    await client.query(
      `INSERT INTO 
      fra_audit 
      (user_email, user_login_email, user_name, message, country_iso, section, target) 
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7);`,
      [user.email, user.loginEmail, user.name, message, countryIso, section, target]
    )
  } else {
    await client.query(
      `INSERT INTO 
        fra_audit 
        (user_email, user_login_email, user_name, message, section, target) 
      VALUES 
        ($1, $2, $3, $4, $5, $6);`,
      [user.email, user.loginEmail, user.name, message, section, target]
    )
  }
}

export const getLastAuditTimeStampForSection = (countryIso: any, section: any) => {
  const excludedMsgs = ['createIssue', 'createComment', 'deleteComment']
  return db.pool
    .query(
      ` SELECT
        section as section_name,
        to_char(max(time), 'YYYY-MM-DD"T"HH24:MI:ssZ') as latest_edit
      FROM fra_audit
      WHERE country_iso = $1
            AND section = $2
            AND NOT (message in ($3))
      GROUP BY section_name
    `,
      [countryIso, section, excludedMsgs]
    )
    .then((res: any) => res?.rows?.[0]?.latest_edit)
}

export const getAuditFeed = (countryIso: any) => {
  return db.pool
    .query(
      ` SELECT
        u.id as user_id,
        user_name as full_name,
        user_email as email,
        message,
        section AS section_name,
        target,
        to_char(time, 'YYYY-MM-DD"T"HH24:MI:ssZ') AS edit_time
      FROM (
        SELECT
          user_name,
          user_email,
          message,
          section,
          target,
          time,
          rank() OVER (PARTITION BY user_name, user_email, message, section ORDER BY time DESC) as rank
        FROM fra_audit
        WHERE country_iso = $1
        AND message != 'deleteComment'
      ) AS fa
      JOIN
        fra_user u
      ON user_email = u.email  
      WHERE rank = 1
      ORDER BY time DESC
      LIMIT 20
    `,
      [countryIso]
    )
    .then((res: any) => res.rows.map(camelize))
}
