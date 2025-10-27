import { generateMetaCache } from 'server/cache/repository/metaCache/generateMetaCache'
import { getMetaCache } from 'server/cache/repository/metaCache/getMetaCache'
import { removeMetaCache } from 'server/cache/repository/metaCache/removeMetaCache'

export const MetaCacheRedisRepository = {
  generateMetaCache,
  getMetaCache,
  removeMetaCache,
}
