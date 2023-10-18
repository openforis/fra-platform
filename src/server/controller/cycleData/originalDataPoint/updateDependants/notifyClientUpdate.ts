import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle, TableNames } from 'meta/assessment'
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

  colNames: Array<string>
}

export const notifyClientUpdate = async (props: Props) => {
  const { assessment, cycle, countryIso, sectionName, colNames } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const countryISOs = [countryIso]
  const tableNames = [TableNames.extentOfForest, TableNames.forestCharacteristics]
  const data = await getTableData({ assessment, cycle, countryISOs, tableNames, mergeOdp: true })
  const originalDataPointVariables = getOriginalDataPointVariables({ cycle, sectionName })

  // send originalDataPointValue table updates to client via websocket
  const propsEvent = { countryIso, assessmentName, cycleName }
  const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent(propsEvent)
  const nodesUpdated: Array<NodeUpdate> = []

  colNames.forEach((colName) => {
    originalDataPointVariables.forEach(({ variableName, tableName }) => {
      const propsValue = { assessmentName, cycleName, colName, variableName, tableName, countryIso, data }
      const value = RecordAssessmentDatas.getNodeValue(propsValue)
      const nodeUpdate = {
        tableName: value.odpId ? TableNames.originalDataPointValue : tableName,
        variableName,
        colName,
        value,
      }

      if (!Objects.isEmpty(value)) nodesUpdated.push(nodeUpdate)
    })
  })
  const nodeUpdatesUpdated: NodeUpdates = { assessmentName, cycleName, countryIso, nodes: nodesUpdated }

  SocketServer.emit(nodeUpdateEvent, { nodeUpdates: nodeUpdatesUpdated })
}
