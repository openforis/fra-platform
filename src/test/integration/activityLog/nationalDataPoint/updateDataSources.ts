import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { UUIDs } from 'meta/uuid/uuids'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  test('Expect update data sources to write activity log', async () => {
    const { assessment, country, cycle, user } = testContext.activityLog
    const dataSources = [{ comments: '', reference: 'Reference', type: '', uuid: UUIDs.getUuid() }]
    const nationalDataPoint = { ...testContext.nationalDataPoint, dataSources }

    await NationalDataPointController.updateDataSources({
      assessment,
      country,
      cycle,
      originalDataPoint: nationalDataPoint,
      user,
    })

    await ActivityLogAssertions.expectLastActivityLog<OriginalDataPoint>({
      ...testContext.activityLog,
      message: ActivityLogMessage.originalDataPointUpdateDataSources,
      section: 'odp',
      target: { ...nationalDataPoint, dataSources },
    })
  })
}
