import { Assessment, Cycle, OriginalDataPoint, TableNames } from '@meta/assessment'
import { NodeUpdates, TableDatas } from '@meta/data'
import { Sockets } from '@meta/socket'
import { User } from '@meta/user'

import { getTableData } from '@server/controller/cycleData/getTableData'
import { BaseProtocol } from '@server/db'
import { SocketServer } from '@server/service/socket'

import { calculateAndValidateDependentNodes } from './persistNodeValue/calculateAndValidateDependentNodes'
import { originalDataPointVariables } from './originalDataPointVariables'

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

  if (originalDataPoint.year) {
    const { countryIso } = originalDataPoint
    const colName = String(originalDataPoint.year)

    // calculate and validate all odp variables
    for (let i = 0; i < originalDataPointVariables.length; i += 1) {
      const { sectionName, tableName, variableName } = originalDataPointVariables[i]

      const nodeUpdates: NodeUpdates = { assessment, cycle, countryIso, nodes: [] }

      // eslint-disable-next-line no-await-in-loop
      await calculateAndValidateDependentNodes(
        {
          colName,
          cycle,
          nodeUpdates,
          sectionName,
          tableName,
          user,
          variableName,
          assessment,
          countryIso,
          isODP: true,
        },
        client
      )
    }

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
            data,
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
