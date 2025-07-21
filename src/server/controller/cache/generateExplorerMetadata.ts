import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db'
import { ExplorerRedisRepository } from 'server/repository/redis/explorer'
import { Logger } from 'server/utils/logger'

type Props = { assessment: Assessment; cycle: Cycle }

export const generateExplorerMetadata = async (props: Props, client: BaseProtocol = DB) => {
  const { assessment, cycle } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const explorerMetadata = await ExplorerRedisRepository.getManyMetadata({ assessment, cycle, force: true }, client)

  Logger.info(
    `${assessmentName}-${cycleName}: "${Object.keys(explorerMetadata).length} explorer metadata sections" generated`
  )
}
