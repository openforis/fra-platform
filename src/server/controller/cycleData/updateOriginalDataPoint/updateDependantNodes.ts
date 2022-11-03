import { Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'
import { User } from '@meta/user'

import { getExtentOfForestDependantUpdates } from '@server/controller/cycleData/updateOriginalDataPoint/getExtentOfForestDependantUpdates'
import { getForestCharacteristicsDependantUpdates } from '@server/controller/cycleData/updateOriginalDataPoint/getForestCharacteristicsDependantUpdates'
import { handleWebsocket } from '@server/controller/cycleData/updateOriginalDataPoint/handleWebsocket'
import { mergeUpdates } from '@server/controller/cycleData/updateOriginalDataPoint/mergeUpdates'
import { BaseProtocol, DB } from '@server/db'

export const updateDependantNodes = async (
  props: { originalDataPoint: OriginalDataPoint; assessment: Assessment; cycle: Cycle; user: User },
  client: BaseProtocol = DB
) => {
  const { originalDataPoint, user, cycle, assessment } = props
  const colName = String(originalDataPoint.year)
  const { countryIso } = originalDataPoint

  const extentOfForestUpdates = await getExtentOfForestDependantUpdates({
    countryIso,
    assessment,
    cycle,
    colName,
    user,
    originalDataPoint,
    client,
  })

  const forestCharacteristicsUpdates = await getForestCharacteristicsDependantUpdates({
    countryIso,
    assessment,
    cycle,
    colName,
    user,
    originalDataPoint,
    client,
  })

  handleWebsocket(mergeUpdates(forestCharacteristicsUpdates, extentOfForestUpdates))
}
