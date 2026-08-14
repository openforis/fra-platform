import '../scriptInit'

import { Promises } from 'utils/promises'
import { ToolsUtils } from 'tools/utils/toolsUtils'

import { RedisData } from 'server/cache/repository/redisData'
import { Logger } from 'server/utils/logger'

const legacyValidationKeyPatterns = [
  'data:validation:descriptions:*',
  'data:validation:nationalDataPoints:*',
  'data:validation:tables:*',
]

const removeLegacyRedisKeys = async (): Promise<void> => {
  const redis = RedisData.getInstance()

  const scanAndRemove = async (pattern: string): Promise<number> => {
    const removedCounts = await Array.fromAsync(
      redis.scanStream({ match: pattern, count: 1000 }),
      async (keys: Array<string>): Promise<number> => (keys.length > 0 ? redis.unlink(...keys) : 0)
    )

    return removedCounts.reduce((total, count) => total + count, 0)
  }

  const removedKeysByPattern = await Promises.each(legacyValidationKeyPatterns, scanAndRemove)
  const removedKeys = removedKeysByPattern.reduce((total, count) => total + count, 0)

  Logger.info(`Removed ${removedKeys} legacy validation keys from Redis.`)
}

ToolsUtils.exec(removeLegacyRedisKeys)
