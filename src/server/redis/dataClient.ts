import IORedis from 'ioredis'

import { RedisClient } from 'server/redis/client'
import { ProcessEnv } from 'server/utils'

export class RedisDataClient {
  static #instance: IORedis

  static getInstance(): IORedis {
    if (!RedisDataClient.#instance) {
      RedisDataClient.#instance = RedisClient.newInstance(ProcessEnv.redisDataUrl)
    }
    return RedisDataClient.#instance
  }
}
