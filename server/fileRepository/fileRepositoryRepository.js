const camelize = require('camelize')
const db = require('../db/db')
const auditRepository = require('./../audit/auditRepository')

const persistFile = async (client, user, countryIso, file) => {
  await auditRepository.insertAudit(client, user.id, 'fileRepositoryUpload', countryIso, 'fileRepository', {file: file.name})

  await client.query(`
    INSERT INTO repository 
    (country_iso, file_name, file)
    VALUES ($1, $2, $3)
  `, [countryIso, file.name, file.data])

  return await getFilesList(countryIso, client)
}

const getFilesList = async (countryIso, client = db) => {
  const filesListResp = await client.query(`
    SELECT country_iso, file_name, file
    FROM repository
    WHERE country_iso = $1
  `, [countryIso])

  return camelize(filesListResp.rows)
}

module.exports = {
  persistFile,
  getFilesList
}
