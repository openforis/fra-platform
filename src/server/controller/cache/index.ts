import { generateArea } from 'server/controller/cache/generateArea'
import { generateAssessments } from 'server/controller/cache/generateAssessments'
import { generateData } from 'server/controller/cache/generateData'
import { generateExplorerMetadata } from 'server/controller/cache/generateExplorerMetadata'
import { generateMetadata } from 'server/controller/cache/generateMetadata'

export const CacheController = {
  generateArea,
  generateAssessments,
  generateData,
  generateExplorerMetadata,
  generateMetadata,
}
