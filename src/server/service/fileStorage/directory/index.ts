import {
  _Object,
  CopyObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
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

const copy = async (props: { sourcePath: string; targetPath: string; bucket?: string }): Promise<void> => {
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
const remove = async (props: { path: string; bucket?: string }): Promise<void> => {
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

export const Directory = {
  copy,
  remove,
}
