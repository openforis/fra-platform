const camelize = require('camelize')
const R = require('ramda')
const db = require('../db/db')
const auditRepository = require('./../audit/auditRepository')

const persistFile = async (client, user, countryIso, file, fileCountryIso) => {
  await auditRepository.insertAudit(client, user.id, 'fileRepositoryUpload', countryIso, 'fileRepository', {file: file.name})

  await client.query(`
    INSERT INTO repository 
    (country_iso, file_name, file)
    VALUES ($1, $2, $3)
  `, [fileCountryIso, file.name, file.data])

  return await getFilesList(countryIso, client)
}

const getFilesList = async (countryIso, client = db) => {
  const filesListResp = await client.query(`
    SELECT id, country_iso, file_name
    FROM repository
    WHERE country_iso = $1
    OR country_iso IS NULL
  `, [countryIso])

  return camelize(filesListResp.rows)
}

const getFile = async (fileId, client = db) => {
  const fileResp = await client.query(`
    SELECT id, country_iso, file_name, file
    FROM repository
    WHERE id = $1
  `, [fileId])

  if (R.isEmpty(fileResp.rows))
    return null
  else {
    const resp = fileResp.rows[0]

    return {
      id: resp.id,
      countryIso: resp.country_iso,
      fileName: resp.file_name,
      file: resp.file
    }
  }
}

const deleteFile = async (client, user, countryIso, fileId) => {
  const file = await getFile(fileId, client)
  if (file) {
    await auditRepository.insertAudit(client, user.id, 'fileRepositoryDelete', countryIso, 'fileRepository', {file: file.fileName})

    await client.query(`
      DELETE FROM repository 
      WHERE id = $1
    `, [fileId])
  }
  return await getFilesList(countryIso, client)
}

module.exports = {
  persistFile,
  getFilesList,
  getFile,
  deleteFile
}
