import { Promises } from 'utils/promises'

import { Assessment } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { RowRedisRepository } from 'server/repository/redis/row'
import { SectionRedisRepository } from 'server/repository/redis/section'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
}

export const generateMetadataCache = async (props: Props, client: BaseProtocol = DB) => {
  const { assessment } = props
  const assessmentName = assessment.props.name

  const rows = await RowRedisRepository.getRows({ assessment, force: true }, client)
  Logger.debug(`${assessmentName}: "${Object.keys(rows).length} rows" generated`)

  await Promises.each(assessment.cycles, async (cycle) => {
    const cycleName = cycle.name

    const sections = await SectionRedisRepository.getMany({ assessment, cycle, force: true }, client)
    Logger.debug(`${assessmentName}-${cycleName}: "${sections.length} sections" generated`)

    const sectionsMetadata = await SectionRedisRepository.getManyMetadata({ assessment, cycle, force: true }, client)
    Logger.debug(`${assessmentName}-${cycleName}: "${Object.keys(sectionsMetadata).length} sectionsMetadata" generated`)
  })
}
