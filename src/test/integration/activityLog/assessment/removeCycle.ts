import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { AssessmentController } from 'server/controller/assessment'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect remove cycle to write activity log', async () => {
    const { assessment, user } = testContext.activityLog
    const { activityLogCycle } = testContext

    const { cycle } = await AssessmentController.removeCycle({ assessment, cycle: activityLogCycle, user })

    await ActivityLogAssertions.expectLastActivityLog({
      assessment,
      message: ActivityLogMessage.assessmentCycleDelete,
      section: 'assessment',
      target: cycle,
      user,
    })
  })
}
