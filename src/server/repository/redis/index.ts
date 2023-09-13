import IORedis from 'ioredis'

import { ProcessEnv } from 'server/utils'

export const REDIS = new IORedis(ProcessEnv.redisDataUrl)
