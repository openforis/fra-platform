import { ListObjectsV2Command } from '@aws-sdk/client-s3'

import { BaseProtocol, DB } from 'server/db/db'
import { s3Client } from 'server/service/fileStorage/s3Client'
import { ProcessEnv } from 'server/utils'

// AWS Config
const Bucket = ProcessEnv.s3BucketName
const Prefix = 'public/'

const _listPage = async (continuationToken?: string): Promise<Map<string, number>> => {
  const command = new ListObjectsV2Command({ Bucket, Prefix, ContinuationToken: continuationToken })
  const response = await s3Client.send(command)

  // { uuid: size }
  const sizeByUuid = new Map<string, number>()

  response.Contents?.forEach(({ Key, Size }) => {
    if (Key && Size !== undefined) {
      sizeByUuid.set(Key.replace(Prefix, ''), Size)
    }
  })

  if (response.NextContinuationToken) {
    const next = await _listPage(response.NextContinuationToken)
    next.forEach((size, uuid) => sizeByUuid.set(uuid, size))
  }

  return sizeByUuid
}

const client: BaseProtocol = DB
export default async (): Promise<void> => {
  await client.none(`alter table public.file add column if not exists size bigint not null default 0`)

  const files = await client.many<{ uuid: string }>(`select uuid from public.file`)

  const sizeByUuid = await _listPage()

  const values = files.map(({ uuid }) => `('${uuid}'::uuid, ${sizeByUuid.get(uuid) ?? 0})`).join(', ')

  await client.none(`
    update public.file as f
      set size = v.size
      from (values ${values}) as v(uuid, size)
      where f.uuid = v.uuid
  `)
}
