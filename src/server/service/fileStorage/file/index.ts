import { Readable } from 'stream'
import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'

import { ProcessEnv } from 'server/utils'

const s3Client = new S3Client({
  region: ProcessEnv.awsRegion,
  credentials: {
    accessKeyId: ProcessEnv.awsAccessKeyId,
    secretAccessKey: ProcessEnv.awsSecretAccessKey,
  },
})

const get = async (props: { key: string; bucket?: string; path?: string }): Promise<Readable> => {
  const { bucket = ProcessEnv.s3BucketName, key, path = 'public' } = props
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: `${path}/${key}`,
  })

  const response = await s3Client.send(command)
  return response.Body as Readable
}
const remove = async (props: { key: string; bucket?: string; path?: string }): Promise<void> => {
  const { bucket = ProcessEnv.s3BucketName, key, path = 'public' } = props

  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: `${path}/${key}`,
  })

  await s3Client.send(command)
}

const upload = async (props: {
  key: string
  body: Buffer | Readable
  bucket?: string
  contentType?: string
  path?: string
}): Promise<void> => {
  const { body, bucket = ProcessEnv.s3BucketName, contentType, key, path = 'public' } = props
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: `${path}/${key}`,
    Body: body,
    ContentType: contentType,
  })

  await s3Client.send(command)
}
const getSize = async (props: { key: string; bucket?: string; path?: string }): Promise<number> => {
  const { bucket = ProcessEnv.s3BucketName, key, path = 'public' } = props
  const command = new HeadObjectCommand({
    Bucket: bucket,
    Key: `${path}/${key}`,
  })

  const response = await s3Client.send(command)
  return response.ContentLength || 0
}

const exists = async (props: { key: string; bucket?: string; path?: string }): Promise<boolean> => {
  const { bucket = ProcessEnv.s3BucketName, key, path = 'public' } = props
  const command = new HeadObjectCommand({
    Bucket: bucket,
    Key: `${path}/${key}`,
  })

  try {
    await s3Client.send(command)
    return true
  } catch (error) {
    if (error.name === 'NotFound') {
      return false
    }
    throw error
  }
}

export const File = {
  exists,
  get,
  getSize,
  remove,
  upload,
}
