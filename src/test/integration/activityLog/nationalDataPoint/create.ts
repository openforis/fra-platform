import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { nationalDataPointParams } from 'test/integration/mock/nationalDataPoint'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect create to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog

    const nationalDataPoint = await NationalDataPointController.create({
      assessment,
      country,
      cycle,
      originalDataPoint: nationalDataPointParams as OriginalDataPoint,
      sectionName: SectionNames.nationalDataPoint,
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog({
      ...testContext.activityLog,
      message: ActivityLogMessage.originalDataPointCreate,
      section: 'odp',
      target: { ...nationalDataPoint, year: nationalDataPointParams.year },
    })

    // created NDP used in future tests
    testContext.nationalDataPoint = nationalDataPoint
  })
}
