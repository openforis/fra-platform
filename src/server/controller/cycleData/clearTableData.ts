import { CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'
import { Sockets } from '@meta/socket'
import { User } from '@meta/user'

import { scheduleUpdateDependencies } from '@server/controller/cycleData/updateDependencies'
import { BaseProtocol, DB } from '@server/db'
import { DataRepository } from '@server/repository/assessmentCycle/data'
import { ActivityLogRepository } from '@server/repository/public/activityLog'
import { SocketServer } from '@server/service/socket'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  sectionName: string
  tableName: string
  user: User
}

export const clearTableData = async (props: Props, client: BaseProtocol = DB): Promise<any> => {
  const { assessment, cycle, tableName, countryIso, user, sectionName } = props

  return client.tx(async (t) => {
    const nodes = await DataRepository.clearTableData(
      {
        assessment,
        cycle,
        tableName,
        countryISOs: [countryIso],
      },
      t
    )

    const nodeUpdates = {
      assessment,
      cycle,
      countryIso,
      nodes,
    }

    const propsEvent = { countryIso, assessmentName: assessment.props.name, cycleName: cycle.name }
    const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent(propsEvent)
    SocketServer.emit(nodeUpdateEvent, { nodeUpdates })

    // schedule dependencies update
    await scheduleUpdateDependencies({
      isODP: true,
      // @ts-ignore
      nodeUpdates,
      sectionName,
      user,
    })

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: {
            countryIso,
            tableName,
            nodes,
          },
          section: sectionName,
          message: ActivityLogMessage.tableValuesClear,
          user,
        },
        assessment,
        cycle,
      },
      t
    )

    return nodes
  })
}
