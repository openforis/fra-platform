import { generateArea } from 'server/controller/cache/generateArea'
import { generateAssessment } from 'server/controller/cache/generateAssessment'
import { generateData } from 'server/controller/cache/generateData'
import { generateExplorerMetadata } from 'server/controller/cache/generateExplorerMetadata'
import { generateMetadata } from 'server/controller/cache/generateMetadata'

export const CacheController = {
  generateArea,
  generateAssessment,
  generateData,
  generateExplorerMetadata,
  generateMetadata,
}
