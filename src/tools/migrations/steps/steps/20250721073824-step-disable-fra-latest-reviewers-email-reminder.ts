import { AssessmentNames } from 'meta/assessment/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
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
