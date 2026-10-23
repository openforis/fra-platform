import IORedis, { RedisOptions } from 'ioredis'

import { ProcessEnv } from 'server/utils/processEnv'

const newInstance = (url: string, options: RedisOptions = {}): IORedis => {
  // redis://  = unencrypted
  // rediss:// = TLS (extra s)
  const tls = url.startsWith('rediss://') ? { rejectUnauthorized: ProcessEnv.redisTlsRejectUnauthorized } : undefined

  return new IORedis(url, { tls, ...options })
}

export const RedisClient = {
  newInstance,
}
