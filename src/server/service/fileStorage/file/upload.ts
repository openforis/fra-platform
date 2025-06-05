import { Readable } from 'stream'
import { PutObjectCommand } from '@aws-sdk/client-s3'

import { ProcessEnv } from 'server/utils'

import { s3Client } from '../s3Client'

export const upload = async (props: {
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
