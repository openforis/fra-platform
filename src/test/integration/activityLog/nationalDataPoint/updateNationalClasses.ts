import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { ODPNationalClassFactory, OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { NationalDataPointController } from 'server/controller/cycleData/nationalDataPoint'

import { ActivityLogAssertions } from 'test/integration/activityLog/activityLogAssertions'
import { getLastActivityLog } from 'test/integration/activityLog/getLastActivityLog'
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

    const message = ActivityLogMessage.originalDataPointUpdateNationalClasses
    const activityLog = await getLastActivityLog<OriginalDataPoint>({
      assessment,
      countryIso: country.countryIso,
      cycle,
      message,
    })

    ActivityLogAssertions.expectActivityLog(activityLog, { assessment, country, cycle, message, section: 'odp', user })
    ActivityLogAssertions.expectTarget(activityLog.target, { ...updatedNationalDataPoint, nationalClasses })

    testContext.nationalDataPoint = updatedNationalDataPoint
  })
}
