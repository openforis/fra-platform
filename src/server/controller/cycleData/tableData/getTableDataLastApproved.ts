import { Objects } from 'utils/objects'

import { HistoryLastApprovedInfo } from 'meta/cycleData/historyLastApproved'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { getTableData } from 'server/controller/cycleData/getTableData'
import { BaseProtocol, DB } from 'server/db'
import { TableRedisRepository } from 'server/repository/redis/table'

import { PropsGetTableData } from './props'

type Props = PropsGetTableData & { info: HistoryLastApprovedInfo }

export const getTableDataLastApproved = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<RecordAssessmentData> => {
  const { assessment, countryISOs, cycle, info, mergeOdp = true, tableNames: _tableNames } = props
  const { prevCycle } = info
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
    return {
      [assessmentName]: {
        [cycle.name]: countryISOs.reduce((acc, countryIso) => {
          const countryData = RecordAssessmentDatas.getCountryData({ assessmentName, cycleName, countryIso, data })
          return { ...acc, [countryIso]: countryData }
        }, {}),
      },
    }
  }

  return {}
}
