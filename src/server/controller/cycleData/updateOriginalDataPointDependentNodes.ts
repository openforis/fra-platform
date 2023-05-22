import { Assessment, Cycle, OriginalDataPoint, TableNames } from '@meta/assessment'
import { NodeUpdate, NodeUpdates, TableDatas } from '@meta/data'
import { Sockets } from '@meta/socket'
import { User } from '@meta/user'

import { getTableData } from '@server/controller/cycleData/getTableData'
import { scheduleUpdateDependencies } from '@server/controller/cycleData/updateDependencies'
import { BaseProtocol } from '@server/db'
import { SocketServer } from '@server/service/socket'

import { getOriginalDataPointVariables } from './getOriginalDataPointVariables'

export const updateOriginalDataPointDependentNodes = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    originalDataPoint: OriginalDataPoint
    user: User
  },
  client: BaseProtocol
): Promise<void> => {
  const { assessment, cycle, originalDataPoint, user } = props
  const { countryIso, year } = originalDataPoint

  if (year) {
    const colName = String(year)
    const originalDataPointVariables = getOriginalDataPointVariables(cycle)

    // schedule original data point variables dependencies update
    const nodes = originalDataPointVariables.map<NodeUpdate>(({ tableName, variableName }) => ({
      tableName,
      variableName,
      colName,
      value: undefined,
    }))
    await scheduleUpdateDependencies({
      isODP: true,
      nodeUpdates: { assessment, cycle, countryIso, nodes },
      sectionName: 'extentOfForest', // TODO: remove sectionName as prop from UpdateDependenciesProps
      user,
    })

    // fetch updated odp in TableData format
    const data = await getTableData(
      {
        aggregate: false,
        columns: [],
        mergeOdp: true,
        tableNames: [TableNames.extentOfForest, TableNames.forestCharacteristics],
        variables: [],
        assessment,
        cycle,
        countryISOs: [countryIso],
      },
      client
    )

    // send originalDataPointValue table updates to client via websocket
    const assessmentName = assessment.props.name
    const cycleName = cycle.name
    const tableNameTarget = TableNames.originalDataPointValue

    const propsEvent = { countryIso, assessmentName, cycleName, tableName: tableNameTarget, colName }
    const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent(propsEvent)

    const nodeUpdates: NodeUpdates = {
      assessment,
      cycle,
      countryIso,
      nodes: originalDataPointVariables.map(({ variableName, tableName }) => {
        return {
          value: TableDatas.getNodeValue({
            colName,
            variableName,
            tableName,
            countryIso,
            data: data[assessmentName][cycleName],
          }),
          colName,
          tableName: TableNames.originalDataPointValue,
          variableName,
        }
      }),
    }

    SocketServer.emit(nodeUpdateEvent, { nodeUpdates })
  }
}
