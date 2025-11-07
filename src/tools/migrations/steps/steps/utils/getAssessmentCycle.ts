import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol } from 'server/db/db'
import { AssessmentController } from 'server/controller/assessment'

const getFra2025 = async (client: BaseProtocol): Promise<{ assessment: Assessment; cycle: Cycle }> => {
  return AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2025', metaCache: true },
    client
  )
}

export const AssessmentCycleUtil = {
  getFra2025,
}
