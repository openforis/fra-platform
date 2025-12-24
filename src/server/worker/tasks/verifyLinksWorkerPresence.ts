import IORedis from 'ioredis'

import { ProcessEnv } from 'server/utils'

const workerPresenceKey = 'verifyLinks:worker:active'
const workerPresenceTtlMs = 10 * 60 * 1000
const redis = new IORedis(ProcessEnv.redisQueueUrl)
redis.options.maxRetriesPerRequest = null

const isWorkerActive = async (): Promise<boolean> => {
  const value = await redis.get(workerPresenceKey)
  return Boolean(value)
}

const tryAcquireWorkerLock = async (value: string): Promise<boolean> => {
  const result = await redis.set(workerPresenceKey, value, 'PX', workerPresenceTtlMs, 'NX')
  return result === 'OK'
}

const refreshWorkerLock = async (value: string): Promise<void> => {
  await redis.set(workerPresenceKey, value, 'PX', workerPresenceTtlMs)
}

const clearWorkerLock = async (): Promise<void> => {
  await redis.del(workerPresenceKey)
}

const disconnect = async (): Promise<void> => {
  await redis.quit()
}

export const VerifyLinksWorkerPresence = {
  clearWorkerLock,
  disconnect,
  isWorkerActive,
  redis,
  refreshWorkerLock,
  tryAcquireWorkerLock,
  workerPresenceKey,
  workerPresenceTtlMs,
}
