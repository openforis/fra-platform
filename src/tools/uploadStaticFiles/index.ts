import '../scriptInit'

import fs from 'node:fs'
import path from 'node:path'

import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { FileStorage } from 'server/service/fileStorage'
import { Logger } from 'server/utils/logger'

import { ToolsUtils } from '../utils/toolsUtils'

const basePath = 'static'
const staticFilesDir = path.resolve(__dirname, 'staticFiles')

const _assert = (test: boolean, err: string): void => {
  if (!test) throw new Error(err)
}

interface FileEntry {
  name: string
  relPath: string
  s3Path: string
}

const getAllFiles = (): Array<FileEntry> => {
  const results: Array<FileEntry> = []

  const walk = (dir: string, relPath = ''): void => {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    entries.forEach((entry) => {
      const entryPath = path.join(dir, entry.name)
      const entryRelPath = path.join(relPath, entry.name)
      if (entry.isDirectory()) {
        walk(entryPath, entryRelPath)
      } else if (entry.isFile()) {
        const dir = path.dirname(entryRelPath)
        const s3Path = dir === '.' ? basePath : `${basePath}/${dir}`
        results.push({ name: entry.name, relPath: entryRelPath, s3Path })
      }
    })
  }

  walk(staticFilesDir)
  return results
}

const getReuploadPath = (): string | null => {
  const reuploadArg = process.argv.find((arg) => arg.startsWith('--reupload'))
  if (!reuploadArg) return null

  _assert(reuploadArg.includes('='), 'Invalid --reupload flag format. Use: --reupload=path/to/dir')

  // e.g. --reupload=path/to/dir/file
  const path = reuploadArg.split('=')[1]
  _assert(!Objects.isEmpty(path), 'Invalid --reupload flag: path cannot be empty. Use: --reupload=path/to/dir')

  return path
}

const shouldReuploadFile = (file: FileEntry, reuploadPath: string | null): boolean => {
  if (!reuploadPath) return false
  const fullS3Path = `${file.s3Path}/${file.name}`
  return fullS3Path.includes(reuploadPath)
}

/**
 * Usage with reupload given folder:
 * ts-node src/tools/uploadStaticFiles/index.ts --reupload=fra/2025/dataDownload
 */
const uploadAllFiles = async (): Promise<void> => {
  const files = getAllFiles()
  const reuploadPath = getReuploadPath()

  await Promises.each(files, async (file) => {
    const key = file.name
    const { s3Path } = file
    const forceReupload = shouldReuploadFile(file, reuploadPath)

    // Handle reupload of file/dir
    if (forceReupload) {
      Logger.info(`[Re-uploading] ${key} to s3 at ${s3Path}`)
      const body = fs.readFileSync(path.join(staticFilesDir, file.relPath))
      await FileStorage.File.upload({ key, body, path: s3Path })
      return
    }

    const exists = await FileStorage.File.exists({ key, path: s3Path })
    if (exists) {
      Logger.info(`[Skipping] ${key} already exists in ${s3Path}`)
    } else {
      Logger.info(`[Uploading] ${key} to s3 at ${s3Path}`)
      const body = fs.readFileSync(path.join(staticFilesDir, file.relPath))
      await FileStorage.File.upload({ key, body, path: s3Path })
    }
  })
}

ToolsUtils.exec(uploadAllFiles)
