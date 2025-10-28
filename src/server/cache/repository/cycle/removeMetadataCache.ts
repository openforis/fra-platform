import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db'
import { RowRedisRepository } from 'server/cache/repository/row'
import { SectionRedisRepository } from 'server/cache/repository/section'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const removeMetadataCache = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const rows = await RowRedisRepository.getRows({ assessment, force: true }, client)
  Logger.debug(`${assessmentName}: "${Object.keys(rows).length} rows" generated`)

  await SectionRedisRepository.removeCycleEntries({ assessment, cycle })
  Logger.debug(`${assessmentName}-${cycleName}: Metadata removed from redis`)
}
