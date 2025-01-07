import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { RowRedisRepository } from 'server/repository/redis/row'
import { SectionRedisRepository } from 'server/repository/redis/section'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
  cycleSource: Cycle
  cycleTarget: Cycle
}

export const renameMetadataCache = async (props: Props, client: BaseProtocol = DB) => {
  const { assessment, cycleSource, cycleTarget } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycleTarget

  const rows = await RowRedisRepository.getRows({ assessment, force: true }, client)
  Logger.debug(`${assessmentName}: "${Object.keys(rows).length} rows" generated`)

  await SectionRedisRepository.renameCycleEntries({ assessment, cycleSource, cycleTarget })
  Logger.debug(`${assessmentName}-${cycleName}: Metadata renamed from redis`)
}
