import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update year to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { nationalDataPoint } = testContext
    const targetYear = nationalDataPoint.year + 1

    const updatedNationalDataPoint = await NationalDataPointController.updateYear({
      assessment,
      country,
      cycle,
      id: String(nationalDataPoint.id),
      sectionName: SectionNames.nationalDataPoint,
      targetYear: String(targetYear),
      user,
      year: String(nationalDataPoint.year),
    })

    await ActivityLogAssertions.expectLastActivityLog<OriginalDataPoint>({
      ...testContext.activityLog,
      message: ActivityLogMessage.originalDataPointUpdateYear,
      section: 'odp',
      target: { ...updatedNationalDataPoint, year: targetYear },
    })

    testContext.nationalDataPoint = updatedNationalDataPoint
  })
}
