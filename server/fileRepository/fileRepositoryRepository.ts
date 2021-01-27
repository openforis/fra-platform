// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'camelize'.
const camelize = require('camelize')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('../db/db')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'auditRepos... Remove this comment to see the full error message
const auditRepository = require('../audit/auditRepository')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'persistFil... Remove this comment to see the full error message
const persistFile = async (client: any, user: any, countryIso: any, file: any, fileCountryIso: any) => {
  await auditRepository.insertAudit(client, user.id, 'fileRepositoryUpload', countryIso, 'fileRepository', {
    file: file.name,
  })

  await client.query(
    `
    INSERT INTO repository 
    (country_iso, file_name, file)
    VALUES ($1, $2, $3)
  `,
    [fileCountryIso, file.name, file.data]
  )

  return await getFilesList(countryIso, client)
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getFilesLi... Remove this comment to see the full error message
const getFilesList = async (countryIso: any, client = db) => {
  const filesListResp = await client.query(
    `
    SELECT id, country_iso, file_name
    FROM repository
    WHERE country_iso = $1
    OR country_iso IS NULL
  `,
    [countryIso]
  )

  return camelize(filesListResp.rows)
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getFile'.
const getFile = async (fileId: any, client = db) => {
  const fileResp = await client.query(
    `
    SELECT id, country_iso, file_name, file
    FROM repository
    WHERE id = $1
  `,
    [fileId]
  )

  if (R.isEmpty(fileResp.rows)) return null

  const resp = fileResp.rows[0]

  return {
    id: resp.id,
    countryIso: resp.country_iso,
    fileName: resp.file_name,
    file: resp.file,
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'deleteFile... Remove this comment to see the full error message
const deleteFile = async (client: any, user: any, countryIso: any, fileId: any) => {
  const file = await getFile(fileId, client)
  if (file) {
    await auditRepository.insertAudit(client, user.id, 'fileRepositoryDelete', countryIso, 'fileRepository', {
      file: file.fileName,
    })

    await client.query(
      `
      DELETE FROM repository 
      WHERE id = $1
    `,
      [fileId]
    )
  }
  return await getFilesList(countryIso, client)
}

module.exports = {
  persistFile,
  getFilesList,
  getFile,
  deleteFile,
}
