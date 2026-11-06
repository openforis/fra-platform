import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { getLastActivityLog } from 'test/integration/activityLog/getLastActivityLog'
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

    const message = ActivityLogMessage.originalDataPointRemove
    const activityLog = await getLastActivityLog<Pick<OriginalDataPoint, 'uuid' | 'year'>>({
      assessment,
      countryIso: country.countryIso,
      cycle,
      message,
    })

    ActivityLogAssertions.expectActivityLog(activityLog, { assessment, country, cycle, message, section: 'odp', user })
    ActivityLogAssertions.expectTarget(activityLog.target, {
      uuid: nationalDataPoint.uuid,
      year: nationalDataPoint.year,
    })
  })
}
