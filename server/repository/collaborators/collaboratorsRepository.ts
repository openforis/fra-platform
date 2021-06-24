import * as R from 'ramda'
// @ts-ignore
import * as camelize from 'camelize'
import { collaborator } from '@common/countryRole'
import * as db from '../../db/db_deprecated'

export const fetchCollaboratorCountryAccessTables = async (countryIso: any, collaboratorId: any) => {
  const selectRes = await db.pool.query(
    `
    SELECT
      u.id as user_id,
      u.email,
      u.name,
      u.login_email,
      u.lang,
      cr.role,
      ca.tables
    FROM
      fra_user u
    JOIN
      user_country_role cr
      ON
        u.id = cr.user_id
      AND
        cr.country_iso = $1
    LEFT OUTER JOIN
        collaborators_country_access ca
        ON ca.user_id = u.id
        AND ca.country_iso = cr.country_iso
    WHERE
      cr.role = $2
    AND
      u.id = $3    
  `,
    [countryIso, collaborator.role, collaboratorId]
  )

  return R.pipe(
    camelize,
    R.map((ca: any) => ({
      ...ca,
      tables: R.path(['tables', 'tables'], ca),
    })),
    R.head,
    R.prop('tables'),
    R.defaultTo([{ tableNo: 'all', section: 'all', label: 'contactPersons.all' }])
    // @ts-ignore
  )(selectRes.rows)
}

export const persistCollaboratorCountryAccess = async (
  client: any,
  _user: any,
  countryIso: any,
  collaboratorTableAccess: any
) => {
  const selectRes = await client.query(
    `
    SELECT id 
    FROM collaborators_country_access
    WHERE user_id = $1
    AND country_iso = $2
  `,
    [collaboratorTableAccess.userId, countryIso]
  )

  if (R.isEmpty(selectRes.rows)) {
    await client.query(
      `
      INSERT INTO collaborators_country_access
      (user_id, country_iso, tables)
      VALUES ($1, $2, $3)
    `,
      [collaboratorTableAccess.userId, countryIso, { tables: collaboratorTableAccess.tables }]
    )
  } else {
    await client.query(
      `
      UPDATE collaborators_country_access
      SET tables = $1
      WHERE user_id = $2
      AND country_iso = $3
    `,
      [{ tables: collaboratorTableAccess.tables }, collaboratorTableAccess.userId, countryIso]
    )
  }
}

export default {
  fetchCollaboratorCountryAccessTables,
  persistCollaboratorCountryAccess,
}
