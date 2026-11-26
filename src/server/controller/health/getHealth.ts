import { setTimeout } from 'timers/promises'
import { HeadBucketCommand } from '@aws-sdk/client-s3'

import { DB } from 'server/db/db'
import { s3Client } from 'server/service/fileStorage/s3Client'
import { RedisDataClient } from 'server/service/redis/dataClient'
import { RedisQueueClient } from 'server/service/redis/queueClient'
import { ProcessEnv } from 'server/utils'
import { Logger } from 'server/utils/logger'

const timeoutMs = 3_000

type DependencyName = 'db' | 'redisData' | 'redisQueue' | 's3'

export enum HealthStatus {
  error = 'error',
  ok = 'ok',
}

export type Health = {
  dependencies: Record<DependencyName, HealthStatus>
  status: HealthStatus
}

const checks: Record<DependencyName, () => Promise<unknown>> = {
  db: () => DB.one('select 1'),
  redisData: () => RedisDataClient.getInstance().ping(),
  redisQueue: () => RedisQueueClient.getInstance().ping(),
  s3: () => s3Client.send(new HeadBucketCommand({ Bucket: ProcessEnv.s3BucketName })),
}

const _timeout = async (): Promise<never> => {
  await setTimeout(timeoutMs)
  throw new Error('timeout')
}

export const getHealth = async (): Promise<Health> => {
  const entries = await Promise.all(
    Object.entries(checks).map(async ([name, check]): Promise<[string, HealthStatus]> => {
      try {
        await Promise.race([check(), _timeout()])
        return [name, HealthStatus.ok]
      } catch (error) {
        Logger.error(`[health] ${name} check failed: ${error.message ?? error}`)
        return [name, HealthStatus.error]
      }
    })
  )

  const dependencies = Object.fromEntries(entries) as Health['dependencies']
  const status = entries.every(([, dependencyStatus]) => dependencyStatus === HealthStatus.ok)
    ? HealthStatus.ok
    : HealthStatus.error

  return { dependencies, status }
}
