import '../scriptInit'

import * as fs from 'node:fs'
import * as path from 'node:path'
import { Promises } from 'utils/promises'

import { FileStorage } from 'server/service/fileStorage'
import { Logger } from 'server/utils/logger'

import { ToolsUtils } from '../utils/toolsUtils'

const basePath = 'static'
const staticFilesDir = path.resolve(__dirname, 'staticFiles')

interface FileEntry {
  name: string
  relPath: string
  s3Path: string
}

const getAllFiles = (): Array<FileEntry> => {
  const results: Array<FileEntry> = []

  const walk = (dir: string, relPath = '') => {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    entries.forEach((entry) => {
      const entryPath = path.join(dir, entry.name)
      const entryRelPath = path.join(relPath, entry.name)
      if (entry.isDirectory()) {
        walk(entryPath, entryRelPath)
      } else if (entry.isFile()) {
        const s3Path = `${basePath}/${path.dirname(entryRelPath)}`
        results.push({ name: entry.name, relPath: entryRelPath, s3Path })
      }
    })
  }

  walk(staticFilesDir)
  return results
}

const uploadAllFiles = async () => {
  const files = getAllFiles()
  await Promises.each(files, async (file) => {
    const key = file.name
    const { s3Path } = file
    const exists = await FileStorage.fileExists({ key, path: s3Path })
    if (exists) {
      Logger.info(`[Skipping] ${key} already exists in ${s3Path}`)
    } else {
      Logger.info(`[Uploading] ${key} to s3 at ${s3Path}`)
      const body = fs.readFileSync(path.join(staticFilesDir, file.relPath))
      await FileStorage.uploadFile({ key, body, path: s3Path })
    }
  })
}

ToolsUtils.exec(uploadAllFiles)
