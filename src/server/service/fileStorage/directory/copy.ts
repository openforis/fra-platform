import { _Object, CopyObjectCommand, ListObjectsV2Command, ListObjectsV2CommandOutput } from '@aws-sdk/client-s3'

import { ProcessEnv } from 'server/utils'

import { s3Client } from '../s3Client'

export const copy = async (props: { sourcePath: string; targetPath: string; bucket?: string }): Promise<void> => {
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
