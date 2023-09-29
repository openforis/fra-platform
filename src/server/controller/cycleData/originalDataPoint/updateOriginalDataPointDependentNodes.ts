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

  if (!year) {
    return
  }

  // first update cache
  const tableName = TableNames.originalDataPointValue
  await DataRedisRepository.cacheCountryTable({ assessment, cycle, countryIso, tableName, force: true })

  const colName = String(year)
  const originalDataPointVariables = getOriginalDataPointVariables({ cycle, sectionName })
  const nodes = originalDataPointVariables.map<NodeUpdate>(({ tableName, variableName }) => ({
    tableName,
    variableName,
    colName,
    value: undefined,
  }))

  await scheduleUpdateDependencies({
    isODP: true,
    nodeUpdates: { assessment, cycle, countryIso, nodes },
    user,
  })

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
        value: RecordAssessmentDatas.getNodeValue({
          assessmentName,
          cycleName,
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
