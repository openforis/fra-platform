import { RedisQueueClient } from 'server/redis/queueClient'

// Presence key used by the controller to avoid starting multiple dynos.
const workerPresenceKey = 'verifyLinks:worker:active'
const workerPresenceTtlMs = 10 * 60 * 1000

const isWorkerActive = async (): Promise<boolean> => {
  const value = await RedisQueueClient.getInstance().get(workerPresenceKey)
  return Boolean(value)
}

const tryAcquireWorkerLock = async (value: string): Promise<boolean> => {
  const result = await RedisQueueClient.getInstance().set(workerPresenceKey, value, 'PX', workerPresenceTtlMs, 'NX')
  return result === 'OK'
}

const refreshWorkerLock = async (value: string): Promise<void> => {
  await RedisQueueClient.getInstance().set(workerPresenceKey, value, 'PX', workerPresenceTtlMs)
}

const clearWorkerLock = async (): Promise<void> => {
  await RedisQueueClient.getInstance().del(workerPresenceKey)
}

export const VerifyLinksWorkerPresence = {
  clearWorkerLock,
  isWorkerActive,
  refreshWorkerLock,
  tryAcquireWorkerLock,
  workerPresenceKey,
  workerPresenceTtlMs,
}
