import IORedis from 'ioredis'

import { ProcessEnv } from 'server/utils'
import { RedisClient } from 'server/utils/redisClient'

export class RedisData {
  private static _instance: IORedis

  public static getInstance(): IORedis {
    if (!this._instance) {
      this._instance = RedisClient.create(ProcessEnv.redisDataUrl)
    }
    return this._instance
  }
}
