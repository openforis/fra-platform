import { CountryStatus } from 'meta/area/countryStatus'
import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { AreaController } from 'server/controller/area'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update status to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    // Note: activity log is only created when country status changes
    const status = country.props.status === CountryStatus.review ? CountryStatus.editing : CountryStatus.review

    await AreaController.updateCountry({
      assessment,
      country: { ...country, props: { ...country.props, status } },
      cycle,
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.assessmentStatusUpdate,
      section: 'assessment',
      target: { status },
    })
  })
}
