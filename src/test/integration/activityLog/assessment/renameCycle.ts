import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { AssessmentController } from 'server/controller/assessment'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { initialiseCycle } from 'test/integration/activityLog/initialiseCycle'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect rename cycle to write activity log', async () => {
    const { user } = testContext.activityLog
    const { activityLogCycle } = testContext
    // assessment with the cycle created in createCycle
    const assessment = await AssessmentController.getOne({
      assessmentName: testContext.activityLog.assessment.props.name,
    })

    await initialiseCycle({ assessment, cycle: activityLogCycle, user })

    const { cycle } = await AssessmentController.renameCycle({
      assessment,
      cycle: activityLogCycle,
      name: '2027',
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      assessment,
      message: ActivityLogMessage.assessmentCycleRename,
      section: 'assessment',
      target: cycle,
      user,
    })

    testContext.activityLogCycle = cycle
  })
}
