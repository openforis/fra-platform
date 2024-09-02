import { Readable } from 'stream'
import { GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

import { ProcessEnv } from 'server/utils'

const s3Client = new S3Client({
  region: ProcessEnv.awsRegion,
  credentials: {
    accessKeyId: ProcessEnv.awsAccessKeyId,
    secretAccessKey: ProcessEnv.awsSecretAccessKey,
  },
})

const getFile = async (props: { key: string; bucket?: string; path?: string }): Promise<Readable> => {
  const { key, bucket = ProcessEnv.s3BucketName, path = 'public' } = props
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: `${path}/${key}`,
  })

  const response = await s3Client.send(command)
  return response.Body as Readable
}

const uploadFile = async (props: {
  key: string
  body: Buffer | Readable
  bucket?: string
  contentType?: string
  path?: string
}): Promise<void> => {
  const { key, body, bucket = ProcessEnv.s3BucketName, contentType, path = 'public' } = props
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: `${path}/${key}`,
    Body: body,
    ContentType: contentType,
  })

  await s3Client.send(command)
}

const getFileSize = async (props: { key: string; bucket?: string; path?: string }): Promise<number> => {
  const { key, bucket = ProcessEnv.s3BucketName, path = 'public' } = props
  const command = new HeadObjectCommand({
    Bucket: bucket,
    Key: `${path}/${key}`,
  })

  const response = await s3Client.send(command)
  return response.ContentLength || 0
}

export const FileStorage = {
  getFile,
  uploadFile,
  getFileSize,
}
