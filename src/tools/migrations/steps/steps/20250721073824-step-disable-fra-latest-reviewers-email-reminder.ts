import { AssessmentNames } from 'meta/assessment/assessment'

import { BaseProtocol } from 'server/db/db'
import { AssessmentController } from 'server/controller/assessment'

export default async (client: BaseProtocol): Promise<void> => {
  const { cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: 'latest' },
    client
  )

  await AssessmentController.updateCycle(
    {
      cycle: { ...cycle, props: { ...cycle.props, disabledReviewerEmailReminders: true } },
    },
    client
  )
}
