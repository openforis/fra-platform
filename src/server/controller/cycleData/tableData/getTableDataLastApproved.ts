import { Objects } from 'utils/objects'

import { TableName } from 'meta/assessment'
import { HistoryLastApprovedInfo } from 'meta/cycleData/historyLastApproved'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { BaseProtocol, DB } from 'server/db'
import { DataRepository } from 'server/repository/assessmentCycle/data'
import { TableRedisRepository } from 'server/repository/redis/table'

import { getTableData } from '../getTableData'
import { PropsGetTableData } from './props'

type Props = Omit<PropsGetTableData, 'mergeOdp'> & { info: HistoryLastApprovedInfo }

// Sets default values for tableData
const _withDefaults = (props: Props & { data: RecordAssessmentData }) => {
  const { assessment, countryISOs, cycle, tableNames, data } = props

  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  countryISOs.forEach((countryIso) => {
    tableNames.forEach((tableName) => {
      const tableData = RecordAssessmentDatas.getTableData({ assessmentName, cycleName, countryIso, tableName, data })
      if (Objects.isEmpty(tableData)) {
        const path = [assessmentName, cycleName, countryIso, tableName]
        const value = {}
        Objects.setInPath({ path, obj: data, value })
      }
    })
  })
  return data
}

export const getTableDataLastApproved = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<RecordAssessmentData> => {
  const { assessment, countryISOs, cycle, info, tableNames } = props
  const { prevCycle, lastAccepted } = info ?? {}
  const prevCycleName = prevCycle?.name

  const hasPrevCycle = !Objects.isNil(prevCycle)
  const hasLastAccepted = !Objects.isNil(lastAccepted)

  let data = {}
  if (hasPrevCycle) {
    const tablesPrevCycle = await Promise.all(
      (tableNames ?? []).map((tableName) => TableRedisRepository.getOne({ assessment, cycle: prevCycle, tableName }))
    )
    const tableNamesPrevCycle = tablesPrevCycle?.reduce<Array<TableName>>(
      (acc, table) => (Objects.isNil(table) ? acc : [...acc, table.props.name]),
      []
    )

    if (!Objects.isEmpty(tableNamesPrevCycle)) {
      const mergeOdp = !hasLastAccepted // when has last accepted, odp gets manually merged later
      data = await getTableData({ ...props, tableNames: tableNamesPrevCycle, mergeOdp, cycle: prevCycle }, client)
    }
  }

  if (!Objects.isEmpty(data)) {
    const { name: assessmentName } = assessment.props
    const cycleName = prevCycleName
    data = {
      [assessmentName]: {
        [cycle.name]: countryISOs.reduce((acc, countryIso) => {
          const countryData = RecordAssessmentDatas.getCountryData({ assessmentName, cycleName, countryIso, data })
          return { ...acc, [countryIso]: countryData }
        }, {}),
      },
    }
  }

  if (hasLastAccepted) {
    const assessmentName = assessment.props.name
    const cycleName = cycle.name
    const lastApprovedData = {
      [assessmentName]: {
        [cycleName]: await DataRepository.getTableDataLastApproved(props, client),
      },
    }

    data = Objects.merge(data, lastApprovedData)
  }

  return _withDefaults({ ...props, data })
}
