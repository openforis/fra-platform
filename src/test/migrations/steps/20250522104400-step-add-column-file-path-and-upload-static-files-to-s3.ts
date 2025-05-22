import * as fs from 'node:fs'
import * as path from 'node:path'
import * as pgPromise from 'pg-promise'
import { Promises } from 'utils/promises'

import { BaseProtocol } from 'server/db'
import { FileStorage } from 'server/service/fileStorage'
import { Logger } from 'server/utils/logger'

const basePath = 'static'

const _getFiles = (): Array<{ name: string; path: string }> => {
  const baseDir = path.resolve(__dirname, 'data/staticFiles')
  const results: Array<{ name: string; path: string }> = []

  const walk = (dir: string, relPath = '') => {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    entries.forEach((entry) => {
      const entryPath = path.join(dir, entry.name)
      const entryRelPath = path.join(relPath, entry.name)
      if (entry.isDirectory()) {
        walk(entryPath, entryRelPath)
      } else if (entry.isFile()) {
        const dirPath = path.dirname(entryRelPath)
        results.push({ name: entry.name, path: `${basePath}/${dirPath}` })
      }
    })
  }

  walk(baseDir)
  return results
}

export default async (client: BaseProtocol) => {
  // 1. Add 'path' column if it doesn't exist
  await client.query('alter table public.file add column if not exists path varchar(255);')
  // 2. Add unique constraint on 'path' and 'name'
  await client.query('alter table public.file add constraint unique_path_name unique (path, name);')

  // 3. Insert file metadata
  const files = _getFiles()

  const pgp = pgPromise()
  const columns = [
    { name: 'name', prop: 'name' },
    { name: 'path', prop: 'path' },
  ]
  const cs = new pgp.helpers.ColumnSet(columns, { table: { table: 'file', schema: 'public' } })
  const insertQuery = `${pgp.helpers.insert(files, cs)} on conflict (path, name) do nothing returning uuid, name, path;`
  const result: Array<{ uuid: string; name: string; path: string }> = await client.query(insertQuery)

  // 4. Upload files to s3
  await Promises.each(result, async (row) => {
    const key = row.name
    const filePathLocal = row.path.replace(/^static\/?/, '').replace(/\/$/, '')
    const exists = await FileStorage.fileExists({ key, path: row.path })
    if (exists) {
      Logger.info(`[Skipping] ${key} already exists`)
    } else {
      Logger.info(`[Uploading] ${key} to s3`)
      const body = fs.readFileSync(path.resolve(__dirname, 'data/staticFiles', filePathLocal, row.name))
      await FileStorage.uploadFile({ key, body, path: row.path })
    }
  })
}
