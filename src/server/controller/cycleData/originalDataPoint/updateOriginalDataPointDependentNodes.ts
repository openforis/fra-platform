import { Assessment, Cycle, OriginalDataPoint, TableNames } from 'meta/assessment'
import { NodeUpdate, NodeUpdates, RecordAssessmentDatas } from 'meta/data'
import { Sockets } from 'meta/socket'
import { User } from 'meta/user'

import { getTableData } from 'server/controller/cycleData/getTableData'
import { scheduleUpdateDependencies } from 'server/controller/cycleData/updateDependencies'
import { DataRedisRepository } from 'server/repository/redis/data'
import { SocketServer } from 'server/service/socket'

import { getOriginalDataPointVariables } from './getOriginalDataPointVariables'

type Props = {
  assessment: Assessment
  cycle: Cycle
  originalDataPoint: OriginalDataPoint
  user: User
  sectionName?: string
}

export const updateOriginalDataPointDependentNodes = async (props: Props): Promise<void> => {
  const { assessment, cycle, sectionName, originalDataPoint, user } = props
  const { countryIso, year } = originalDataPoint
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  if (!year) {
    return
  }

  // 1. update cache
  const tableName = TableNames.originalDataPointValue
  await DataRedisRepository.cacheCountryTable({ assessment, cycle, countryIso, tableName, force: true })

  // 2. schedule dependencies update
  const colName = String(year)
  const originalDataPointVariables = getOriginalDataPointVariables({ cycle, sectionName })
  const nodes = originalDataPointVariables.map<NodeUpdate>(({ tableName, variableName }) => {
    return { tableName, variableName, colName, value: undefined }
  })

  const nodeUpdates = { assessmentName, cycleName, countryIso, nodes }
  const propsDeps = { assessment, cycle, isODP: true, nodeUpdates, user }
  await scheduleUpdateDependencies(propsDeps)

  // 3. notifies client
  const data = await getTableData({
    aggregate: false,
    columns: [],
    mergeOdp: true,
    tableNames: [TableNames.extentOfForest, TableNames.forestCharacteristics],
    variables: [],
    assessment,
    cycle,
    countryISOs: [countryIso],
  })

  // send originalDataPointValue table updates to client via websocket
  const tableNameTarget = TableNames.originalDataPointValue
  const propsEvent = { countryIso, assessmentName, cycleName, tableName: tableNameTarget, colName }
  const nodeUpdateEvent = Sockets.getNodeValuesUpdateEvent(propsEvent)

  const nodesUpdated = originalDataPointVariables.map<NodeUpdate>(({ variableName, tableName }) => {
    const propsValue = { assessmentName, cycleName, colName, variableName, tableName, countryIso, data }
    const value = RecordAssessmentDatas.getNodeValue(propsValue)
    return { tableName: TableNames.originalDataPointValue, variableName, colName, value }
  })
  const nodeUpdatesUpdated: NodeUpdates = { assessmentName, cycleName, countryIso, nodes: nodesUpdated }
  SocketServer.emit(nodeUpdateEvent, { nodeUpdates: nodeUpdatesUpdated })
}
