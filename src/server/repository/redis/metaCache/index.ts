import { generateMetaCache } from 'server/repository/redis/metaCache/generateMetaCache'
import { getMetaCache } from 'server/repository/redis/metaCache/getMetaCache'
import { removeMetaCache } from 'server/repository/redis/metaCache/removeMetaCache'

export const MetaCacheRedisRepository = {
  generateMetaCache,
  getMetaCache,
  removeMetaCache,
}
