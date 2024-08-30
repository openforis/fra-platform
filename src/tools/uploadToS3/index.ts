import 'tsconfig-paths/register'
import 'dotenv/config'

import * as fs from 'fs'
import * as path from 'path'

import { FileStorage } from 'server/service/fileStorage'
import { Logger } from 'server/utils/logger'
import { ProcessEnv } from 'server/utils/processEnv'

const BUCKET_NAME = ProcessEnv.s3BucketName

if (!BUCKET_NAME) {
  Logger.error('S3_BUCKET_NAME must be defined in the .env file.\nCheck .env.template for example')
  process.exit(1)
}

/**
 * Uploads a file to an S3 bucket.
 * @param filePath - The path to the file to upload.
 */
const uploadFileToS3 = async (filePath: string): Promise<void> => {
  try {
    const fileContent = fs.readFileSync(filePath)
    const key = path.basename(filePath)

    await FileStorage.uploadFile({ key, body: fileContent, bucket: BUCKET_NAME })
    Logger.debug(`File uploaded successfully to ${key}`)
  } catch (err) {
    Logger.error('Error uploading file to S3:', err)
  }
}

// Get the file path from command line arguments
const filePath = process.argv[2]

if (!filePath) {
  Logger.error('Please provide a file path as an argument.')
  process.exit(1)
}

uploadFileToS3(filePath)
