import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db/db'
import { RowRedisRepository } from 'server/cache/repository/row'
import { SectionRedisRepository } from 'server/cache/repository/section'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
  cycleSource: Cycle
  cycleTarget: Cycle
}

export const renameMetadataCache = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycleSource, cycleTarget } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycleTarget

  const rows = await RowRedisRepository.getRows({ assessment, force: true }, client)
  Logger.debug(`${assessmentName}: "${Object.keys(rows).length} rows" generated`)

  await SectionRedisRepository.renameCycleEntries({ assessment, cycleSource, cycleTarget })
  Logger.debug(`${assessmentName}-${cycleName}: Metadata renamed from redis`)
}
