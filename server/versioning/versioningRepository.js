const db = require('../db/db')
const camelize = require('camelize')

/*
  Possible status for version
  'pending', DEFAULT
  'running',
  'completed',
  'failed'
*/

const getAllVersions = async () => {
  const result = await db.query(`
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
const getPendingVersions = async () => {
  const result = await db.query(`
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
const getAllPendingVersions = async () => {
  const result = await db.query(`
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
const getRunningVersions = async () => {
  const result = await db.query(`
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

const updateVersionStatus = async (id, status) => {
  await db.query(`
      UPDATE fra_version
      SET
        status = $2,
        updated_at = NOW()
      WHERE
        id = $1;
  `, [id, status])
}

const addVersion = async (userId, versionNumber, publishedAt) => {
  const query = `
    INSERT INTO fra_version (created_by, version_number, status, published_at)
    VALUES ($1,
            $2,
            'pending',
            $3);
  `
  await db.query(query, [userId, versionNumber, publishedAt])
}

const newSchemaVersion = async (to, from = 'public') => {
  if (!to) {
    console.error(`
      versioningRepository/newSchemaVersion: param @to not defined or null:
    `, to)
    return
  }

  console.log(`Creating new schema version from ${from} to ${to.replace(/\./g, '_')}`);

  const query = `
    SELECT clone_schema($1, $2);
  `
  // Replace all dots to underscores to avoid problems
  await db.query(query, [from.replace(/\./g, '_'), to.replace(/\./g, '_')])
}

const deleteVersion = async (id) => {
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
      await db.query(query)
    }

    // Delete the table entry from fra_version table
    const query2 = `DELETE FROM fra_version WHERE id = $1;`
    await db.query(query2, [id])

  } catch (error) {
    console.log(error)
  }
}

// Used to check if certain schema exists
const getSchemaByName = async (name) => {
  const query = `
    SELECT schema_name
    FROM information_schema.schemata
    WHERE schema_name = $1;
  `
  const result = await db.query(query, [name])
  return camelize(result.rows)
}

// Used to check if certain schema exists
const getVersionById = async (id) => {
  const result = await db.query(`
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
    `, [id])
  return camelize(result.rows)
}

module.exports = {
  addVersion,
  deleteVersion,
  getAllPendingVersions,
  getAllVersions,
  getPendingVersions,
  getRunningVersions,
  getSchemaByName,
  getVersionById,
  newSchemaVersion,
  updateVersionStatus,
}
