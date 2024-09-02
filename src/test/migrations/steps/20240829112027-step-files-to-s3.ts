import * as path from 'path'
import { Promises } from 'utils/promises'

import { BaseProtocol, DB } from 'server/db'
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

const client: BaseProtocol = DB

export default async () => {
  try {
    // Check if _legacy.file table exists
    const legacyTableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = '_legacy.file'
      );
    `)

    if (!legacyTableExists[0].exists) {
      // Create a copy of the public.file table as _legacy.file
      await client.query(`
        CREATE TABLE _legacy.file AS
        TABLE public.file;
      `)
    } else {
      Logger.debug('_legacy.file table already exists, skipping creation.')
    }

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
        const fileExists = await FileStorage.fileExists({ key: s3Key })

        if (!fileExists) {
          await FileStorage.uploadFile({
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

    // Remove the 'file' column from the 'public.file' table
    await client.query(`
      ALTER TABLE public.file
      DROP COLUMN file;
    `)

    Logger.debug('File migration completed and file column removed.')
  } catch (err) {
    Logger.error('Error migrating files:', err)
  }
}
