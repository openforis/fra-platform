import { _Object, DeleteObjectCommand, ListObjectsV2Command, ListObjectsV2CommandOutput } from '@aws-sdk/client-s3'

import { ProcessEnv } from 'server/utils'

import { s3Client } from '../s3Client'

export const remove = async (props: { path: string; bucket?: string }): Promise<void> => {
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
