import * as path from 'path'
import { Promises } from 'utils/promises'

import { BaseProtocol } from 'server/db'
import { FileStorage, FileStorageUtils } from 'server/service/fileStorage'
import { Logger } from 'server/utils/logger'
import { ProcessEnv } from 'server/utils/processEnv'

// TODO: Restrict these
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

export default async (client: BaseProtocol) => {
  try {
    // This should be changed to all files,
    // left for testing purpose (all files 5.7gb, this subset around 80mb)
    const files = await client.query(`
          select * from public.file
          where
          octet_length(file) / 1024.0 / 1024.0 < 2
          and name ilike '%fin%';
    `)

    await Promises.each(files, async (fileRecord: any) => {
      const { id, uuid, name, file } = fileRecord
      const fileExtension = path.extname(name).slice(1).toLowerCase()

      if (allowedExtensions.includes(fileExtension)) {
        const s3Key = `public/${uuid}`
        await FileStorage.uploadFile({
          key: s3Key,
          body: Buffer.from(file),
          bucket: ProcessEnv.s3BucketName,
          contentType: FileStorageUtils.getContentType(fileExtension),
        })
        // Logger.debug(`File ${name} (ID: ${id}) migrated successfully.`)
      } else {
        Logger.debug(`File ${name} (ID: ${id}) skipped due to unsupported file type.`)
      }
    })

    Logger.debug('File migration completed.')
  } catch (err) {
    Logger.error('Error migrating files:', err)
  }
}
