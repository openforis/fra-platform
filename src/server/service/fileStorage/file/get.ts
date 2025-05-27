import { Readable } from 'stream'
import { GetObjectCommand } from '@aws-sdk/client-s3'

import { ProcessEnv } from 'server/utils'

import { s3Client } from '../s3Client'

export const get = async (props: { key: string; bucket?: string; path?: string }): Promise<Readable> => {
  const { bucket = ProcessEnv.s3BucketName, key, path = 'public' } = props
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: `${path}/${key}`,
  })

  const response = await s3Client.send(command)
  return response.Body as Readable
}
