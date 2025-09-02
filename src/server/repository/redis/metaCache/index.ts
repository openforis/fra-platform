import { generateMetaCache } from 'server/repository/redis/metaCache/generateMetaCache'
import { getMetaCache } from 'server/repository/redis/metaCache/getMetaCache'

export const MetaCacheRedisRepository = {
  generateMetaCache,
  getMetaCache,
}
