import IORedis from 'ioredis'

import { RedisClient } from 'server/redis/client'
import { ProcessEnv } from 'server/utils/processEnv'

// Single queue Redis connection shared by BullMQ queues/workers, job locks and socket server.
// maxRetriesPerRequest: null is required by BullMQ workers.
export class RedisQueueClient {
  static #instance: IORedis

  static getInstance(): IORedis {
    if (!RedisQueueClient.#instance) {
      RedisQueueClient.#instance = RedisClient.newInstance(ProcessEnv.redisQueueUrl, { maxRetriesPerRequest: null })
    }
    return RedisQueueClient.#instance
  }
}
