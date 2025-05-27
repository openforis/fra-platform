import { S3Client } from '@aws-sdk/client-s3'

import { ProcessEnv } from 'server/utils'

export const s3Client = new S3Client({
  region: ProcessEnv.awsRegion,
  credentials: {
    accessKeyId: ProcessEnv.awsAccessKeyId,
    secretAccessKey: ProcessEnv.awsSecretAccessKey,
  },
})
