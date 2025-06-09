import { DeleteObjectCommand } from '@aws-sdk/client-s3'

import { ProcessEnv } from 'server/utils'

import { s3Client } from '../s3Client'

export const remove = async (props: { key: string; bucket?: string; path?: string }): Promise<void> => {
  const { bucket = ProcessEnv.s3BucketName, key, path = 'public' } = props

  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: `${path}/${key}`,
  })

  await s3Client.send(command)
}
