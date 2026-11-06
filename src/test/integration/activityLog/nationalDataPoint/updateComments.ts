import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { OriginalDataPoint, OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

const cases: Array<{ field: OriginalDataPointCommentKey; message: ActivityLogMessage }> = [
  { field: TableNames.extentOfForest, message: ActivityLogMessage.originalDataPointUpdateCommentExtentOfForest },
  {
    field: TableNames.forestCharacteristics,
    message: ActivityLogMessage.originalDataPointUpdateCommentForestCharacteristics,
  },
]

export default (): void => {
  test.each(cases)('Expect update comments $field to write activity log', async ({ field, message }) => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const comments = { ...testContext.nationalDataPoint.comments, [field]: `Comment ${field}` }
    const nationalDataPoint = { ...testContext.nationalDataPoint, comments }

    const updatedNationalDataPoint = await NationalDataPointController.updateComments({
      assessment,
      country,
      cycle,
      field,
      originalDataPoint: nationalDataPoint,
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog<OriginalDataPoint>({
      ...testContext.activityLog,
      message,
      section: 'odp',
      target: { ...updatedNationalDataPoint, comments },
    })

    testContext.nationalDataPoint = updatedNationalDataPoint
  })
}
