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

const _getFilteredTableNames = async (
  props: Pick<Props, 'tableNames' | 'assessment' | 'cycle'>
): Promise<Array<TableName>> => {
  const { assessment, cycle, tableNames } = props
  const tables = await Promise.all(
    (tableNames ?? []).map((tableName) => TableRedisRepository.getOne({ assessment, cycle, tableName }))
  )
  return tables.reduce<Array<TableName>>((acc, table) => (Objects.isNil(table) ? acc : [...acc, table.props.name]), [])
}

export const getTableDataLastApproved = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<RecordAssessmentData> => {
  const { assessment, countryISOs, cycle, info, tableNames } = props
  const { prevCycle, lastAccepted } = info
  const prevCycleName = prevCycle?.name

  const hasPrevCycle = !Objects.isNil(prevCycle)
  const hasLastAccepted = !Objects.isNil(lastAccepted)

  let data = {}
  if (hasPrevCycle) {
    const tableNamesPrevCycle = await _getFilteredTableNames({ assessment, cycle: prevCycle, tableNames })

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

    const tableNamesCurrentCycle = await _getFilteredTableNames({ assessment, cycle, tableNames })

    let lastApprovedData = {}

    if (!Objects.isEmpty(tableNamesCurrentCycle)) {
      lastApprovedData = {
        [assessmentName]: {
          [cycleName]: await DataRepository.getTableDataLastApproved(
            { ...props, tableNames: tableNamesCurrentCycle },
            client
          ),
        },
      }
    }

    data = Objects.merge(data, lastApprovedData)
  }

  return data
}
