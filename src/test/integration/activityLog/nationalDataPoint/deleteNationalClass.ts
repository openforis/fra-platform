import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { getLastActivityLog } from 'test/integration/activityLog/getLastActivityLog'
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

    const message = ActivityLogMessage.originalDataPointUpdateNationalClasses
    const activityLog = await getLastActivityLog<OriginalDataPoint>({
      assessment,
      countryIso: country.countryIso,
      cycle,
      message,
    })

    ActivityLogAssertions.expectActivityLog(activityLog, { assessment, country, cycle, message, section: 'odp', user })
    ActivityLogAssertions.expectTarget(activityLog.target, {
      ...updatedNationalDataPoint,
      nationalClasses: nationalDataPoint.nationalClasses.slice(1),
    })

    testContext.nationalDataPoint = updatedNationalDataPoint
  })
}
