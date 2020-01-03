const db = require('../db/db')
const camelize = require('camelize')

const getAllVersions = async () => {
  const result = await db.query(`
      SELECT v.id,
             v.version_number as version,
             v.status,
             v.publish_time as timestamp,
             u.name,
             u.email
      FROM fra_version v
      INNER JOIN fra_user u ON v.created_by = u.id
      ORDER BY v.publish_time;
  `)
  return camelize(result.rows)
}

const addVersion = async (userId, version, timestamp) => {
  const query = `
    INSERT INTO fra_version (created_by, version_number, status, publish_time)
    VALUES ($1,
            $2,
            'pending',
            $3);
  `
  await db.query(query, [userId, version, timestamp])
}

module.exports = {
  addVersion,
  getAllVersions
}
