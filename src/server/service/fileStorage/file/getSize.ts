import { HeadObjectCommand } from '@aws-sdk/client-s3'

import { ProcessEnv } from 'server/utils'

import { s3Client } from '../s3Client'

export const getSize = async (props: { key: string; bucket?: string; path?: string }): Promise<number> => {
  const { bucket = ProcessEnv.s3BucketName, key, path = 'public' } = props
  const command = new HeadObjectCommand({
    Bucket: bucket,
    Key: `${path}/${key}`,
  })

  const response = await s3Client.send(command)
  return response.ContentLength || 0
}
