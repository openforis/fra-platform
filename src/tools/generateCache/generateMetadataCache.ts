import { Assessment, Cycle } from 'meta/assessment'

import { SectionRedisRepository } from 'server/repository/redis/section'
import { Logger } from 'server/utils/logger'

export const generateMetadataCache = async (props: { assessment: Assessment; cycle: Cycle }) => {
  const { assessment, cycle } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  const sections = await SectionRedisRepository.getMany({ assessment, cycle })
  Logger.info(`${assessmentName}-${cycleName}: "${sections.length} sections" generated`)

  const sectionsMetadata = await SectionRedisRepository.getManyMetadata({ assessment, cycle })
  Logger.info(`${assessmentName}-${cycleName}: "${Object.keys(sectionsMetadata).length} sectionsMetadata" generated`)
}
