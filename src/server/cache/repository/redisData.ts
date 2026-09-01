import IORedis from 'ioredis'

import { ProcessEnv } from 'server/utils'
import { RedisClient } from 'server/utils/redis/client'

export class RedisData {
  private static _instance: IORedis

  public static getInstance(): IORedis {
    if (!this._instance) {
      this._instance = RedisClient.newInstance(ProcessEnv.redisDataUrl)
    }
    return this._instance
  }
}
