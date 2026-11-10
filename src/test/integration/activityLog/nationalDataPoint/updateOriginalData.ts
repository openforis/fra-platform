import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { SectionNames } from 'meta/assessment/section'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update original data to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const values = { forestArea: '10', otherWoodedLand: '5' }
    const nationalDataPoint = { ...testContext.nationalDataPoint, values }

    const updatedNationalDataPoint = await NationalDataPointController.updateOriginalData({
      assessment,
      country,
      cycle,
      originalDataPoint: nationalDataPoint,
      sectionName: SectionNames.nationalDataPoint,
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.originalDataPointUpdateOriginalData,
      section: 'odp',
      target: { ...updatedNationalDataPoint, values },
    })

    testContext.nationalDataPoint = updatedNationalDataPoint
  })
}
