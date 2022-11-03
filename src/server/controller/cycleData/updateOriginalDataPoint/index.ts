import { ActivityLogMessage, Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'
import { User } from '@meta/user'

import { getExtentOfForestDependantUpdates } from '@server/controller/cycleData/updateOriginalDataPoint/getExtentOfForestDependantUpdates'
import { getForestCharacteristicsDependantUpdates } from '@server/controller/cycleData/updateOriginalDataPoint/getForestCharacteristicsDependantUpdates'
import { handleWebsocket } from '@server/controller/cycleData/updateOriginalDataPoint/handleWebsocket'
import { mergeUpdates } from '@server/controller/cycleData/updateOriginalDataPoint/mergeUpdates'
import { BaseProtocol, DB } from '@server/db'
import { OriginalDataPointRepository } from '@server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from '@server/repository/public/activityLog'

export const updateOriginalDataPoint = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    originalDataPoint: OriginalDataPoint
    user: User
  },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, cycle, originalDataPoint, user } = props

  const updatedOriginalDataPoint = await OriginalDataPointRepository.update(
    { assessment, cycle, originalDataPoint },
    client
  )

  return client.tx(async (t) => {
    const colName = String(updatedOriginalDataPoint.year)
    const { countryIso } = updatedOriginalDataPoint

    const extentOfForestUpdates = await getExtentOfForestDependantUpdates({
      countryIso,
      assessment,
      cycle,
      colName,
      user,
      updatedOriginalDataPoint,
      client: t,
    })

    const forestCharacteristicsUpdates = await getForestCharacteristicsDependantUpdates({
      countryIso,
      assessment,
      cycle,
      colName,
      user,
      updatedOriginalDataPoint,
      client: t,
    })

    handleWebsocket(mergeUpdates(forestCharacteristicsUpdates, extentOfForestUpdates))

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: updatedOriginalDataPoint,
          section: 'odp',
          message: ActivityLogMessage.originalDataPointUpdate,
          countryIso: originalDataPoint.countryIso,
          user,
        },
        assessment,
        cycle,
      },
      t
    )

    return updatedOriginalDataPoint
  })
}
