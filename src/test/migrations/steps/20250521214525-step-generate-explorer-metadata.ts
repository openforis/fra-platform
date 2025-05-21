import { AssessmentNames } from 'meta/assessment/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/controller/cache'
import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({
    assessmentName: AssessmentNames.fra,
    cycleName: '2025',
  })

  await CacheController.generateExplorerMetadata({ assessment, cycle }, client)
}
