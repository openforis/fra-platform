import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle, OriginalDataPoint, TableNames } from 'meta/assessment'
import { NodeUpdate, NodeUpdates, RecordAssessmentDatas } from 'meta/data'
import { Sockets } from 'meta/socket'

import { getTableData } from 'server/controller/cycleData/getTableData'
import { getOriginalDataPointVariables } from 'server/controller/cycleData/originalDataPoint/getOriginalDataPointVariables'
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

export const notifyClientUpdate = async (props: Props) => {
  const { assessment, cycle, countryIso, sectionName, originalDataPoints } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const countryISOs = [countryIso]
  const tableNames = [TableNames.extentOfForest, TableNames.forestCharacteristics]
  const data = await getTableData({ assessment, cycle, countryISOs, tableNames, mergeOdp: true })
  const originalDataPointVariables = getOriginalDataPointVariables({ cycle, sectionName })

  // send originalDataPointValue table updates to client via websocket
  const propsEvent = { countryIso, assessmentName, cycleName }
  const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent(propsEvent)

  const nodesUpdated: Array<NodeUpdate> = originalDataPoints.reduce<Array<NodeUpdate>>(
    (acc, { originalDataPoint, notifyClient }) => {
      if (notifyClient) {
        const colName = String(originalDataPoint.year)
        originalDataPointVariables.forEach(({ variableName, tableName }) => {
          const propsValue = { assessmentName, cycleName, colName, variableName, tableName, countryIso, data }
          const value = RecordAssessmentDatas.getNodeValue(propsValue)

          if (value.odpId && value.odpId !== originalDataPoint.id)
            throw new Error(`value.odpId ${value.odpId} is different from originalDataPoint.id ${originalDataPoint.id}`)

          const nodeUpdate = { tableName: TableNames.originalDataPointValue, variableName, colName, value }

          if (!Objects.isEmpty(value)) acc.push(nodeUpdate)
        })
      }
      return acc
    },
    []
  )

  const nodeUpdatesUpdated: NodeUpdates = { assessmentName, cycleName, countryIso, nodes: nodesUpdated }

  SocketServer.emit(nodeUpdateEvent, { nodeUpdates: nodeUpdatesUpdated })
}
