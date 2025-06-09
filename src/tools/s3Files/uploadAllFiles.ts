import '../scriptInit'

import * as path from 'node:path'
import { Promises } from 'utils/promises'

import { BaseProtocol, DB } from 'server/db'
import { FileStorage, FileStorageUtils } from 'server/service/fileStorage'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB

const allowedExtensions = [
  'zip',
  'xlsx',
  'xlsm',
  'xls',
  'tsv',
  'pptx',
  'png',
  'pdf',
  'jpg',
  'jpeg',
  'jfif',
  'gif',
  'docx',
  'doc',
  'csv',
  'crdownload', // eg. half downloaded file should be removed from both cycleSchema.repository and
  'bmp',
]

const exec = async (): Promise<void> => {
  // Check file column exists
  const { exists } = await client.one(`
      select exists(
          select from information_schema.columns where table_schema = 'public' and table_name = 'file' and column_name = 'file')
  `)

  if (!exists) {
    Logger.info('No file column found')
    return
  }

  const files = await client.query(`select * from public.file`)

  await Promises.each(files, async (fileRecord: any) => {
    const { file, id, name, uuid } = fileRecord
    const fileExtension = path.extname(name).slice(1).toLowerCase()

    if (allowedExtensions.includes(fileExtension)) {
      const s3Key = `${uuid}`
      const fileExists = await FileStorage.File.exists({ key: s3Key })

      if (!fileExists) {
        await FileStorage.File.upload({
          key: s3Key,
          body: Buffer.from(file),
          bucket: ProcessEnv.s3BucketName,
          contentType: FileStorageUtils.getContentType(fileExtension),
        })
        // Logger.debug(`File ${name} (ID: ${id}) migrated successfully.`)
      } else {
        Logger.debug(`File ${name} (ID: ${id}) already exists in S3, skipping upload.`)
      }
    } else {
      Logger.debug(`File ${name} (ID: ${id}) skipped due to unsupported file type.`)
    }
  })
}

const start = new Date().getTime()
Logger.debug(`========== START UPLOADING S3 FILES ${start}`)

exec().then(() => {
  const end = new Date().getTime()
  Logger.debug(`========== END ${end} ELAPSED ${(end - start) / 1000}s`)
  DB.$pool.end()
  process.exit(0)
})
