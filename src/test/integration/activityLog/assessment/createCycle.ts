import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { AssessmentController } from 'server/controller/assessment'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect create cycle to write activity log', async () => {
    const { assessment, user } = testContext.activityLog

    const { assessment: updatedAssessment, cycle } = await AssessmentController.createCycle({
      assessment,
      options: { name: '2026' },
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      assessment,
      cycle,
      message: ActivityLogMessage.assessmentCycleCreate,
      section: 'assessment',
      target: updatedAssessment,
      user,
    })

    testContext.activityLogCycle = cycle
  })
}
