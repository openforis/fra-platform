import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect delete national class to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { nationalDataPoint } = testContext

    const updatedNationalDataPoint = await NationalDataPointController.deleteNationalClass({
      assessment,
      country,
      cycle,
      id: String(nationalDataPoint.id),
      index: 0,
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.originalDataPointUpdateNationalClasses,
      section: 'odp',
      target: {
        ...updatedNationalDataPoint,
        nationalClasses: nationalDataPoint.nationalClasses.slice(1),
      },
    })

    testContext.nationalDataPoint = updatedNationalDataPoint
  })
}
