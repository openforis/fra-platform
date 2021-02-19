// @ts-ignore
import * as camelize from 'camelize'
import * as db from '../db/db'

/*
  Possible status for version
  'pending', DEFAULT
  'running',
  'completed',
  'failed'
*/

export const getAllVersions = async () => {
  const result = await db.pool.query(`
      SELECT v.id,
             v.version_number,
             v.status,
             to_char(v.published_at,'YYYY-MM-DD"T"HH24:MI:ssZ') as published_at,
             u.name as user_name,
             u.email as user_email,
             u.id as user_id
      FROM fra_version v
      INNER JOIN fra_user u ON v.created_by = u.id
      ORDER BY v.published_at;
  `)
  return camelize(result.rows)
}

// Returns all pending versions from fra_version
// that have published_at in next 5 minutes
export const getPendingVersions = async () => {
  const result = await db.pool.query(`
    SELECT
      id,
      created_by,
      version_number,
      status,
      to_char(v.published_at,'YYYY-MM-DD"T"HH24:MI:ssZ') as published_at,
      to_char(v.created_at,'YYYY-MM-DD"T"HH24:MI:ssZ') as created_at,
      to_char(v.updated_at,'YYYY-MM-DD"T"HH24:MI:ssZ') as updated_at
    FROM fra_version v
    WHERE v.published_at > NOW() - interval '6 minute'
      AND v.published_at <= NOW() + interval '6 minute'
      AND v.status = 'pending'
    ORDER BY v.published_at;
  `)
  return camelize(result.rows)
}

// Returns all pending versions from fra_version
export const getAllPendingVersions = async () => {
  const result = await db.pool.query(`
    SELECT
      id,
      created_by,
      version_number,
      status,
      to_char(v.published_at,'YYYY-MM-DD"T"HH24:MI:ssZ') as published_at,
      to_char(v.created_at,'YYYY-MM-DD"T"HH24:MI:ssZ') as created_at,
      to_char(v.updated_at,'YYYY-MM-DD"T"HH24:MI:ssZ') as updated_at
    FROM fra_version v
    WHERE v.status = 'pending'
    ORDER BY v.published_at;
  `)
  return camelize(result.rows)
}

// Returns all running versions from fra_version
export const getRunningVersions = async () => {
  const result = await db.pool.query(`
    SELECT
      id,
      created_by,
      version_number,
      status,
      to_char(v.published_at,'YYYY-MM-DD"T"HH24:MI:ssZ') as published_at,
      to_char(v.created_at,'YYYY-MM-DD"T"HH24:MI:ssZ') as created_at,
      to_char(v.updated_at,'YYYY-MM-DD"T"HH24:MI:ssZ') as updated_at
    FROM fra_version v
    WHERE v.status = 'running'
    ORDER BY v.published_at;
  `)
  return camelize(result.rows)
}

export const updateVersionStatus = async (id: any, status: any) => {
  await db.pool.query(
    `
      UPDATE fra_version
      SET
        status = $2,
        updated_at = NOW()
      WHERE
        id = $1;
  `,
    [id, status]
  )
}

export const addVersion = async (userId: any, versionNumber: any, publishedAt: any) => {
  const query = `
    INSERT INTO fra_version (created_by, version_number, status, published_at)
    VALUES ($1,
            $2,
            'pending',
            $3);
  `
  await db.pool.query(query, [userId, versionNumber, publishedAt])
}

export const newSchemaVersion = async (to: any, from = 'public') => {
  if (!to) {
    console.error(
      `
      versioningRepository/newSchemaVersion: param @to not defined or null:
    `,
      to
    )
    return
  }

  console.log(`Creating new schema version from ${from} to ${to.replace(/\./g, '_')}`)

  const query = `
    SELECT clone_schema($1, $2);
  `
  // Replace all dots to underscores to avoid problems
  await db.pool.query(query, [from.replace(/\./g, '_'), to.replace(/\./g, '_')])
}

export const deleteVersion = async (id: any) => {
  try {
    const result = await getVersionById(id)
    const { versionNumber } = result[0]
    const schemaName = `public_${versionNumber.replace(/\./g, '_')}`

    const result2 = await getSchemaByName(schemaName)

    // If a schema exists, delete it
    if (result2.length > 0) {
      // Using the parameter in the query works,
      // passing the parameter (with $1) throws error
      const query = `DROP SCHEMA ${schemaName} CASCADE;`
      await db.pool.query(query)
    }

    // Delete the table entry from fra_version table
    const query2 = `DELETE FROM fra_version WHERE id = $1;`
    await db.pool.query(query2, [id])
  } catch (error) {
    console.log(error)
  }
}

// Used to check if certain schema exists
export const getSchemaByName = async (name: any) => {
  const query = `
    SELECT schema_name
    FROM information_schema.schemata
    WHERE schema_name = $1;
  `
  const result = await db.pool.query(query, [name])
  return camelize(result.rows)
}

export const getLatestSchemaVersion = async () => {
  const query = `
      SELECT s.schema_name
      FROM information_schema.schemata s
      WHERE s.schema_name ILIKE 'public_%'
      ORDER BY s.schema_name DESC 
      LIMIT 1;
  `
  const result = await db.pool.query(query)
  if (result.rows.length > 0) {
    const { schemaName } = camelize(result.rows[0])
    return schemaName
  } else {
    return 'public'
  }
}

// Used to check if certain schema exists
export const getVersionById = async (id: any) => {
  const result = await db.pool.query(
    `
        SELECT 
          id,
          created_by,
          version_number,
          status,
          to_char(v.published_at,'YYYY-MM-DD"T"HH24:MI:ssZ') as published_at,
          to_char(v.created_at,'YYYY-MM-DD"T"HH24:MI:ssZ') as created_at,
          to_char(v.updated_at,'YYYY-MM-DD"T"HH24:MI:ssZ') as updated_at
        FROM fra_version v
        WHERE id = $1
    `,
    [id]
  )
  return camelize(result.rows)
}

export default {
  addVersion,
  deleteVersion,
  getAllPendingVersions,
  getAllVersions,
  getPendingVersions,
  getRunningVersions,
  getSchemaByName,
  getLatestSchemaVersion,
  getVersionById,
  newSchemaVersion,
  updateVersionStatus,
}
