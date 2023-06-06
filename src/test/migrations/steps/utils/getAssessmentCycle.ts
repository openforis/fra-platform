import { Assessment, AssessmentNames, Cycle } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db'

const getFra2025 = async (client: BaseProtocol): Promise<{ assessment: Assessment; cycle: Cycle }> => {
  return AssessmentController.getOneWithCycle({ assessmentName: AssessmentNames.fra, cycleName: '2025', metaCache: true }, client)
}

export const AssessmentCycleUtil = {
  getFra2025,
}
