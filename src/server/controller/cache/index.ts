import { generateArea } from 'server/controller/cache/generateArea'
import { generateAssessment } from 'server/controller/cache/generateAssessment'
import { generateAssessments } from 'server/controller/cache/generateAssessments'
import { generateData } from 'server/controller/cache/generateData'
import { generateExplorerMetadata } from 'server/controller/cache/generateExplorerMetadata'
import { generateMetadata } from 'server/controller/cache/generateMetadata'
import { MetaCacheRedisRepository } from 'server/repository/redis/metaCache'

export const CacheController = {
  generateArea,
  generateAssessment,
  generateAssessments,
  generateData,
  generateExplorerMetadata,
  generateMetadata,
  generateMetaCache: MetaCacheRedisRepository.generateMetaCache,
}
