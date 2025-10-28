import { Promises } from 'utils/promises'

import { Assessment } from 'meta/assessment/assessment'

import { BaseProtocol, DB } from 'server/db'
import { RowRedisRepository } from 'server/cache/repository/row'
import { SectionRedisRepository } from 'server/cache/repository/section'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
}

export const generateMetadata = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
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
