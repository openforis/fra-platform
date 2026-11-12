import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect remove to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { nationalDataPoint } = testContext

    await NationalDataPointController.remove({
      assessment,
      country,
      cycle,
      originalDataPoint: nationalDataPoint,
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.originalDataPointRemove,
      section: 'odp',
      target: {
        uuid: nationalDataPoint.uuid,
        year: nationalDataPoint.year,
      },
    })
  })
}
