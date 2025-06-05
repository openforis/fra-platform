import { HeadObjectCommand } from '@aws-sdk/client-s3'

import { ProcessEnv } from 'server/utils'

import { s3Client } from '../s3Client'

export const exists = async (props: { key: string; bucket?: string; path?: string }): Promise<boolean> => {
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
