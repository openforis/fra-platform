import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'
import { Sockets } from 'meta/socket'
import { User } from 'meta/user'

import { updateOriginalDataPointDependentNodes } from 'server/controller/cycleData/originalDataPoint/updateOriginalDataPointDependentNodes'
import { BaseProtocol, DB } from 'server/db'
import { OriginalDataPointRepository } from 'server/repository/assessmentCycle/originalDataPoint'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { SocketServer } from 'server/service/socket'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName: string

  id: string
  year: string
  targetYear: string

  user: User
}

export const updateOriginalDataPointYear = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, cycle, countryIso, sectionName, user, year } = props

  const originalDataPoint = await OriginalDataPointRepository.getOne({ assessment, cycle, countryIso, year })

  const updatedOriginalDataPoint = await client.tx(async (t) => {
    // --- 1. Update ODP year
    const updatedOriginalDataPoint = await OriginalDataPointRepository.updateYear(props, t)

    // --- 2. Update activity log
    const message = ActivityLogMessage.originalDataPointUpdateYear
    const activityLog = { target: updatedOriginalDataPoint, section: 'odp', message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    return updatedOriginalDataPoint
  })

  // --- 3 Update dependents
  // TODO: updateOriginalDatasPointDependentNodes : handle multiple odps in same function
  // --- 3.1 Update nodes for deleted ODP
  const commonProps = { assessment, cycle, sectionName, user }
  await updateOriginalDataPointDependentNodes({ ...commonProps, originalDataPoint, notifyClient: false })
  // --- 3.2 Update  nodes for new ODP
  await updateOriginalDataPointDependentNodes({
    ...commonProps,
    originalDataPoint: updatedOriginalDataPoint,
    notifyClient: false,
  })

  // --- 4. Notify client about the change
  // --- 4.1 Notify client about the 'delete' of the old year
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const nodeUpdateEvent = Sockets.getODPDeleteEvent({ assessmentName, cycleName, countryIso })
  SocketServer.emit(nodeUpdateEvent, { countryIso, year })

  // --- 4.2 Notify client about the 'update' for the target year
  // TODO

  return updatedOriginalDataPoint
}
