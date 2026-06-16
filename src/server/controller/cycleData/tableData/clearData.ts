import { Country } from 'meta/area/country'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NodeUpdate } from 'meta/data/nodeUpdates'
import { Sockets } from 'meta/socket/sockets'
import { User } from 'meta/user/user'

import { DataRedisRepository } from 'server/cache/repository/data'
import { resetMirrorNodes } from 'server/controller/cycleData/tableData/resetMirrorNodes'
import { updateDependents } from 'server/controller/cycleData/tableData/updateDependencies/updateDependents'
import { BaseProtocol, DB } from 'server/db/db'
import { DataRepository } from 'server/db/repository/assessmentCycle/data'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'
import { CountryService } from 'server/service/country'
import { SocketServer } from 'server/service/socket'

type Props = {
  assessment: Assessment
  cycle: Cycle
  country: Country
  sectionName: string
  tableName: string
  user: User
}

export const clearData = async (props: Props, client: BaseProtocol = DB): Promise<Array<NodeUpdate>> => {
  const { assessment, country, cycle, sectionName, tableName, user } = props
  const { countryIso } = country
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  return client.tx(async (t) => {
    const nodes = await DataRepository.clearTableData({ assessment, cycle, tableName, countryISOs: [countryIso] }, t)
    await DataRedisRepository.updateNodes({ assessment, cycle, countryIso, nodes: { [tableName]: nodes } })
    const nodeUpdates = { assessmentName, cycleName, countryIso, nodes }
    const nodeUpdatesMirrorReset = await resetMirrorNodes({ assessment, cycle, nodeUpdates }, client)

    // notify client
    const propsEvent = { countryIso, assessmentName: assessment.props.name, cycleName: cycle.name }
    const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent(propsEvent)
    SocketServer.emit(nodeUpdateEvent, { nodeUpdates: nodeUpdatesMirrorReset })

    // schedule dependencies update
    await updateDependents({ assessment, cycle, country, isODP: true, nodeUpdates, user }, t)

    // persist activity log
    const activityLog = {
      countryIso,
      target: { tableName, nodes },
      section: sectionName,
      message: ActivityLogMessage.tableValuesClear,
      user,
    }
    const { time: lastUpdateTimestamp } = await ActivityLogRepository.insertActivityLog(
      { activityLog, assessment, cycle },
      t
    )
    await CountryService.updateLastEdit({ lastUpdateTimestamp, assessment, cycle, country, user }, t)

    return nodes
  })
}
