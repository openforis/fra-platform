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

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName?: string

  originalDataPoints: Array<{
    originalDataPoint: OriginalDataPoint
    notifyClient: boolean
  }>
}

export const notifyClientUpdate = async (props: Props): Promise<void> => {
  const { assessment, countryIso, cycle, originalDataPoints, sectionName } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const countryISOs = [countryIso]
  const tableNames = [TableNames.extentOfForest, TableNames.forestCharacteristics]
  const data = await getData({ assessment, cycle, countryISOs, tableNames, mergeOdp: true })
  const originalDataPointVariables = getVariables({ cycle, sectionName })

  // send originalDataPointValue table updates to client via websocket
  const propsEvent = { countryIso, assessmentName, cycleName }
  const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent(propsEvent)

  const nodesUpdated: Array<NodeUpdate> = originalDataPoints.reduce<Array<NodeUpdate>>(
    (acc, { notifyClient, originalDataPoint }) => {
      if (notifyClient) {
        const colName = String(originalDataPoint.year)
        originalDataPointVariables.forEach(({ tableName, variableName }) => {
          const propsValue = { assessmentName, cycleName, colName, variableName, tableName, countryIso, data }
          const value = RecordAssessmentDatas.getNodeValue(propsValue)

          if (value.odpId && value.odpId !== originalDataPoint.id)
            throw new Error(`value.odpId ${value.odpId} is different from originalDataPoint.id ${originalDataPoint.id}`)

          const nodeUpdate = { tableName: TableNames.originalDataPointValue, variableName, colName, value }

          acc.push(nodeUpdate)
        })
      }
      return acc
    },
    []
  )

  const nodeUpdatesUpdated: NodeUpdates = { assessmentName, cycleName, countryIso, nodes: nodesUpdated }

  SocketServer.emit(nodeUpdateEvent, { nodeUpdates: nodeUpdatesUpdated })
}
