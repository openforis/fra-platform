import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect create to write activity log', async () => {
    const { assessment, user } = testContext.activityLog

    // note: Assessment is created in test setup (createAssessment)
    await ActivityLogAssertions.expectLastActivityLog({
      assessment,
      message: ActivityLogMessage.assessmentCreate,
      section: 'assessment',
      target: testContext.assessmentCreated,
      user,
    })
  })
}
