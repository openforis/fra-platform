import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { RowRedisRepository } from 'server/repository/redis/row'
import { SectionRedisRepository } from 'server/repository/redis/section'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const removeMetadataCache = async (props: Props, client: BaseProtocol = DB) => {
  const { assessment, cycle } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const rows = await RowRedisRepository.getRows({ assessment, force: true }, client)
  Logger.debug(`${assessmentName}: "${Object.keys(rows).length} rows" generated`)

  await SectionRedisRepository.removeCycleEntries({ assessment, cycle })
  Logger.debug(`${assessmentName}-${cycleName}: Metadata removed from redis`)
}
