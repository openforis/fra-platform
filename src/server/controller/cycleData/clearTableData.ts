import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { NodeUpdate } from 'meta/data'
import { Sockets } from 'meta/socket'
import { User } from 'meta/user'

import { resetMirrorNodes } from 'server/controller/cycleData/resetMirrorNodes'
import { scheduleUpdateDependencies } from 'server/controller/cycleData/updateDependencies'
import { BaseProtocol, DB } from 'server/db'
import { DataRepository } from 'server/repository/assessmentCycle/data'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { SocketServer } from 'server/service/socket'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  sectionName: string
  tableName: string
  user: User
}

export const clearTableData = async (props: Props, client: BaseProtocol = DB): Promise<Array<NodeUpdate>> => {
  const { assessment, cycle, tableName, countryIso, user, sectionName } = props

  return client.tx(async (t) => {
    const nodes = await DataRepository.clearTableData({ assessment, cycle, tableName, countryISOs: [countryIso] }, t)
    const nodeUpdates = { assessment, cycle, countryIso, nodes }
    const nodeUpdatesMirrorReset = await resetMirrorNodes({ nodeUpdates }, client)

    // notify client
    const propsEvent = { countryIso, assessmentName: assessment.props.name, cycleName: cycle.name }
    const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent(propsEvent)
    SocketServer.emit(nodeUpdateEvent, { nodeUpdates: nodeUpdatesMirrorReset })

    // schedule dependencies update
    await scheduleUpdateDependencies({ isODP: true, nodeUpdates, sectionName, user })

    // persist activity log
    const activityLog = {
      target: { countryIso, tableName, nodes },
      section: sectionName,
      message: ActivityLogMessage.tableValuesClear,
      user,
    }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    return nodes
  })
}
