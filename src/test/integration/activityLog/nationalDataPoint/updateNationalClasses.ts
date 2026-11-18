import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { ODPNationalClassFactory } from 'meta/assessment/originalDataPoint'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update national classes to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const nationalClasses = [
      ODPNationalClassFactory.newNationalClass({ name: 'Forest' }),
      ODPNationalClassFactory.newNationalClass({ name: 'Other land' }),
    ]
    const nationalDataPoint = { ...testContext.nationalDataPoint, nationalClasses }

    const updatedNationalDataPoint = await NationalDataPointController.updateNationalClasses({
      assessment,
      country,
      cycle,
      originalDataPoint: nationalDataPoint,
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.originalDataPointUpdateNationalClasses,
      section: 'odp',
      target: { ...updatedNationalDataPoint, nationalClasses },
    })

    testContext.nationalDataPoint = updatedNationalDataPoint
  })
}
