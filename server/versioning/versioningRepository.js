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
             v.version_number as version,
             v.status,
             v.published_at as timestamp,
             u.name,
             u.email,
             u.id as uid
      FROM fra_version v
      INNER JOIN fra_user u ON v.created_by = u.id
      ORDER BY v.published_at;
  `)
  return camelize(result.rows)
}

// Returns all pending versions from fra_version
// that have published_at (timestamp) in next 5 minutes
const getPendingVersions = async () => {
  const result = await db.query(`
    SELECT *
    FROM fra_version v
    WHERE v.published_at > NOW() - interval '1 minute'
      AND v.published_at <= NOW() + interval '5 minute'
      AND v.status = 'pending'
    ORDER BY v.published_at;
  `)
  return camelize(result.rows)
}

// Returns all pending versions from fra_version
const getAllPendingVersions = async () => {
  const result = await db.query(`
    SELECT *
    FROM fra_version v
    WHERE v.status = 'pending'
    ORDER BY v.published_at;
  `)
  return camelize(result.rows)
}

// Returns all running versions from fra_version
const getRunningVersions = async () => {
  const result = await db.query(`
    SELECT *
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

const addVersion = async (userId, version, timestamp) => {
  const query = `
    INSERT INTO fra_version (created_by, version_number, status, published_at)
    VALUES ($1,
            $2,
            'pending',
            $3);
  `
  await db.query(query, [userId, version, timestamp])
}

const newSchemaVersion = async (to, from = 'public') => {
  if (!to) {
    console.error(`
      versioningRepository/newSchemaVersion: param @to not defined or null:
    `, to)
    return
  }

  console.log(`Creating new schema version from ${from} to ${to}`);

  const query = `
    SELECT clone_schema($1, $2);
  `
  // Replace all dots to underscores to avoid problems
  await db.query(query, [from.replace(/\./g, '_'), to.replace(/\./g, '_')])
}

const deleteVersion = async (id) => {
  try {
    const query = `SELECT version_number FROM fra_version WHERE id = $1;`
    const result = await db.query(query, [id])
    const { version_number } = result.rows[0]
    const schemaName = `public_${version_number.replace(/\./g, '_')}`
  
    // Using the parameter in the query works,
    // passing the parameter (with $1) throws error
    const query2 = `DROP SCHEMA ${schemaName} CASCADE;`
    await db.query(query2)
    
    const query3 = `DELETE FROM fra_version WHERE id = $1;`
    await db.query(query3, [id])

  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  addVersion,
  getAllVersions,
  getPendingVersions,
  newSchemaVersion,
  updateVersionStatus,
  getAllPendingVersions,
  getRunningVersions,
  deleteVersion
}
