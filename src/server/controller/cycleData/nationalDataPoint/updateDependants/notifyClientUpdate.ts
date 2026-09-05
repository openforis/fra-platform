import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'
import { NodeUpdate, NodeUpdates } from 'meta/data/nodeUpdates'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { Sockets } from 'meta/socket/sockets'

import { getVariables } from 'server/controller/cycleData/nationalDataPoint/getVariables'
import { getData } from 'server/controller/cycleData/tableData/getData'
import { SocketServer } from 'server/service/socket'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName?: string

  originalDataPoints: Array<OriginalDataPoint>
}

// Errors are logged, not thrown: callers invoke this after their transaction commits,
// so a notification failure must not fail an already-committed request.
export const notifyClientUpdate = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, originalDataPoints, sectionName } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  try {
    const countryISOs = [countryIso]
    const tableNames = [TableNames.extentOfForest, TableNames.forestCharacteristics]
    const data = await getData({ assessment, cycle, countryISOs, tableNames, mergeOdp: true })
    const originalDataPointVariables = getVariables({ cycle, sectionName })

    // send originalDataPointValue table updates to client via websocket
    const propsEvent = { countryIso, assessmentName, cycleName }
    const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent(propsEvent)

    const nodesUpdated: Array<NodeUpdate> = []
    originalDataPoints.forEach((originalDataPoint) => {
      const colName = String(originalDataPoint.year)
      originalDataPointVariables.forEach(({ tableName, variableName }) => {
        const propsValue = { assessmentName, cycleName, colName, variableName, tableName, countryIso, data }
        const value = RecordAssessmentDatas.getNodeValue(propsValue)

        if (value.odpId && value.odpId !== originalDataPoint.id)
          throw new Error(`value.odpId ${value.odpId} is different from originalDataPoint.id ${originalDataPoint.id}`)

        const nodeUpdate = { tableName: TableNames.originalDataPointValue, variableName, colName, value }

        nodesUpdated.push(nodeUpdate)
      })
    })

    const nodeUpdatesUpdated: NodeUpdates = { assessmentName, cycleName, countryIso, nodes: nodesUpdated }

    SocketServer.emit(nodeUpdateEvent, { nodeUpdates: nodeUpdatesUpdated })
  } catch (error) {
    const originalDataPointDetails = originalDataPoints
      .map(({ uuid, year }) => `uuid: ${uuid}, year: ${year}`)
      .join('; ')
    Logger.error(
      `[notifyClientUpdate] failed to notify client of national data point update (${countryIso}; ${originalDataPointDetails}): ${error}`
    )
  }
}
