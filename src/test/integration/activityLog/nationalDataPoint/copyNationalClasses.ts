import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { ODPNationalClassFactory, OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect copy national classes to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const { nationalDataPoint } = testContext

    // Source national data point to copy the national classes from
    const sourceNationalClasses = [ODPNationalClassFactory.newNationalClass({ name: 'Copied class' })]
    const sourceNationalDataPoint = await OriginalDataPointRepository.create({
      assessment,
      cycle,
      originalDataPoint: {
        ...nationalDataPoint,
        nationalClasses: sourceNationalClasses,
        year: nationalDataPoint.year + 1,
      },
    })

    const updatedNationalDataPoint = await NationalDataPointController.copyNationalClasses({
      assessment,
      country,
      cycle,
      targetYear: String(sourceNationalDataPoint.year),
      user,
      year: String(nationalDataPoint.year),
    })

    await ActivityLogAssertions.expectLastActivityLog<OriginalDataPoint>({
      ...testContext.activityLog,
      message: ActivityLogMessage.originalDataPointUpdateNationalClasses,
      section: 'odp',
      target: updatedNationalDataPoint,
    })
    // Copied national classes get new uuids, compare names only
    expect(updatedNationalDataPoint.nationalClasses.map(({ name }) => name)).toEqual(
      sourceNationalClasses.map(({ name }) => name)
    )

    testContext.nationalDataPoint = updatedNationalDataPoint
  })
}
