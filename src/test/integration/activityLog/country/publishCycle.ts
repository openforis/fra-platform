import { CountryStatus } from 'meta/area/countryStatus'
import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect publish cycle to write activity logs', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog

    // only accepted countries get published
    await AreaController.updateCountry({
      assessment,
      country: { ...country, props: { ...country.props, status: CountryStatus.accepted } },
      cycle,
      user,
    })

    const { cycle: cyclePublished } = await AssessmentController.publishCycle({ assessment, cycle, user })

    // ==== In our test case, 2 activity log entries are written:
    // == One for the published cycle
    // == One for each country published (we have just X01 as accepted)

    await ActivityLogAssertions.expectLastActivityLog({
      assessment,
      cycle,
      message: ActivityLogMessage.cyclePublish,
      section: 'cycle',
      target: cyclePublished,
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.assessmentStatusUpdate,
      section: 'assessment',
      target: { status: CountryStatus.published },
    })
  })
}
