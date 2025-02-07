import { Objects } from 'utils/objects'

import { HistoryLastApprovedInfo } from 'meta/cycleData/historyLastApproved'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { BaseProtocol, DB } from 'server/db'
import { DataRepository } from 'server/repository/assessmentCycle/data'
import { TableRedisRepository } from 'server/repository/redis/table'

import { getTableData } from '../getTableData'
import { PropsGetTableData } from './props'

type Props = PropsGetTableData & { info: HistoryLastApprovedInfo }

export const getTableDataLastApproved = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<RecordAssessmentData> => {
  const { assessment, countryISOs, cycle, info, mergeOdp = true, tableNames: _tableNames } = props
  const { prevCycle, lastAccepted } = info
  const prevCycleName = prevCycle?.name

  let data = {}
  if (!Objects.isNil(prevCycle)) {
    const tableNames = (
      await Promise.all(
        _tableNames?.map((tableName) => TableRedisRepository.getOne({ assessment, cycle: prevCycle, tableName })) ?? []
      )
    )
      .filter(Boolean)
      ?.map((table) => table.props.name)

    if (!Objects.isEmpty(tableNames)) {
      data = await getTableData({ ...props, tableNames, mergeOdp, cycle: prevCycle }, client)
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

  if (!Objects.isNil(lastAccepted)) {
    const assessmentName = assessment.props.name
    const cycleName = cycle.name
    const lastApprovedData = {
      [assessmentName]: {
        [cycleName]: await DataRepository.getTableDataLastApproved(props, client),
      },
    }

    data = Objects.merge(data, lastApprovedData)
  }

  return data
}
