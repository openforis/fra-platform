import { Readable } from 'stream'
import {
  _Object,
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
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

const getFile = async (props: { key: string; bucket?: string; path?: string }): Promise<Readable> => {
  const { bucket = ProcessEnv.s3BucketName, key, path = 'public' } = props
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: `${path}/${key}`,
  })

  const response = await s3Client.send(command)
  return response.Body as Readable
}

const removeFile = async (props: { key: string; bucket?: string; path?: string }): Promise<void> => {
  const { bucket = ProcessEnv.s3BucketName, key, path = 'public' } = props

  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: `${path}/${key}`,
  })

  await s3Client.send(command)
}

const uploadFile = async (props: {
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

const getFileSize = async (props: { key: string; bucket?: string; path?: string }): Promise<number> => {
  const { bucket = ProcessEnv.s3BucketName, key, path = 'public' } = props
  const command = new HeadObjectCommand({
    Bucket: bucket,
    Key: `${path}/${key}`,
  })

  const response = await s3Client.send(command)
  return response.ContentLength || 0
}

const fileExists = async (props: { key: string; bucket?: string; path?: string }): Promise<boolean> => {
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

const copyDirectory = async (props: { sourcePath: string; targetPath: string; bucket?: string }): Promise<void> => {
  const { bucket = ProcessEnv.s3BucketName, sourcePath, targetPath } = props

  const copyBatch = async (token?: string): Promise<void> => {
    const listCommand = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: sourcePath.endsWith('/') ? sourcePath : `${sourcePath}/`,
      ContinuationToken: token,
    })
    const listResponse: ListObjectsV2CommandOutput = await s3Client.send(listCommand)
    const contents: Array<_Object> = (listResponse.Contents || []).filter(
      (obj): obj is _Object => typeof obj.Key === 'string'
    )

    await Promise.all(
      contents.map((obj) => {
        const relativeKey = obj.Key.substring(sourcePath.length)
        const targetKey = `${targetPath}${relativeKey}`
        const copyCommand = new CopyObjectCommand({
          Bucket: bucket,
          CopySource: `/${bucket}/${obj.Key}`,
          Key: targetKey,
        })
        return s3Client.send(copyCommand)
      })
    )
    if (listResponse.IsTruncated && listResponse.NextContinuationToken) {
      await copyBatch(listResponse.NextContinuationToken)
    }
  }

  await copyBatch()
}

const removeDirectory = async (props: { path: string; bucket?: string }): Promise<void> => {
  const { bucket = ProcessEnv.s3BucketName, path } = props

  const removeBatch = async (token?: string): Promise<void> => {
    const listCommand = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: path.endsWith('/') ? path : `${path}/`,
      ContinuationToken: token,
    })
    const listResponse: ListObjectsV2CommandOutput = await s3Client.send(listCommand)
    const contents: Array<_Object> = (listResponse.Contents || []).filter(
      (obj): obj is _Object => typeof obj.Key === 'string'
    )

    await Promise.all(
      contents.map((obj) => {
        const deleteCommand = new DeleteObjectCommand({
          Bucket: bucket,
          Key: obj.Key,
        })
        return s3Client.send(deleteCommand)
      })
    )
    if (listResponse.IsTruncated && listResponse.NextContinuationToken) {
      await removeBatch(listResponse.NextContinuationToken)
    }
  }

  await removeBatch()
}

export const FileStorage = {
  copyDirectory,
  fileExists,
  getFile,
  getFileSize,
  removeFile,
  removeDirectory,
  uploadFile,
}
