import { generateArea } from 'server/cache/controller/generateArea'
import { generateAssessment } from 'server/cache/controller/generateAssessment'
import { generateAssessments } from 'server/cache/controller/generateAssessments'
import { generateData } from 'server/cache/controller/generateData'
import { generateExplorerMetadata } from 'server/cache/controller/generateExplorerMetadata'
import { generateMetadata } from 'server/cache/controller/generateMetadata'
import { MetaCacheRedisRepository } from 'server/cache/repository/metaCache'

export const CacheController = {
  generateArea,
  generateAssessment,
  generateAssessments,
  generateData,
  generateExplorerMetadata,
  generateMetadata,
  generateMetaCache: MetaCacheRedisRepository.generateMetaCache,
}
