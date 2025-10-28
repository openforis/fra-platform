import IORedis from 'ioredis'

import { ProcessEnv } from 'server/utils'

export class RedisData {
  private static _instance: IORedis

  public static getInstance(): IORedis {
    if (!this._instance) {
      this._instance = new IORedis(ProcessEnv.redisDataUrl)
    }
    return this._instance
  }
}
