import IORedis, { RedisOptions } from 'ioredis'

import { ProcessEnv } from 'server/utils/processEnv'

const create = (url: string, options: RedisOptions = {}): IORedis =>
  new IORedis(url, {
    // redis://  = unencrypted
    // rediss:// =TLS (extra s)
    tls: url.startsWith('rediss://') ? { rejectUnauthorized: ProcessEnv.redisTlsRejectUnauthorized } : undefined,
    ...options,
  })

export const RedisClient = {
  create,
}
