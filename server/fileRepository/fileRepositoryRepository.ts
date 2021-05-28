// @ts-ignore
import * as camelize from 'camelize'
import * as R from 'ramda'
import * as db from '../db/db'
import * as auditRepository from '../repository/audit/auditRepository'

export const persistFile = async (client: any, user: any, countryIso: any, file: any, fileCountryIso: any) => {
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

export const getFilesList = async (countryIso: any, client = db.pool) => {
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

export const getFile = async (fileId: any, client = db.pool) => {
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

export const deleteFile = async (client: any, user: any, countryIso: any, fileId: any) => {
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

export default {
  persistFile,
  getFilesList,
  getFile,
  deleteFile,
}
