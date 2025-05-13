import { Objects } from 'utils/objects'

import { TableName } from 'meta/assessment/table'
import { HistoryLastApprovedInfo } from 'meta/cycleData/historyLastApproved'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { getTableData } from 'server/controller/cycleData/getTableData'
import { PropsGetTableData } from 'server/controller/cycleData/tableData/props'
import { BaseProtocol, DB } from 'server/db'
import { TableRedisRepository } from 'server/repository/redis/table'

import { PropsGetLastApproved } from './_types'

type Props = PropsGetLastApproved & Pick<PropsGetTableData, 'mergeOdp'> & { info: HistoryLastApprovedInfo }

export const getTableDataPrevCycle = async (props: Props, client: BaseProtocol = DB): Promise<RecordAssessmentData> => {
  const { assessment, countryISOs, cycle, info, mergeOdp, tableNames } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const { prevCycle } = info

  if (!Objects.isNil(prevCycle)) {
    const tablesPrevCycle = await Promise.all(
      (tableNames ?? []).map((tableName) => TableRedisRepository.getOne({ assessment, cycle: prevCycle, tableName }))
    )
    const tableNamesPrevCycle = tablesPrevCycle?.reduce<Array<TableName>>(
      (acc, table) => (Objects.isNil(table) ? acc : [...acc, table.props.name]),
      []
    )

    if (!Objects.isEmpty(tableNamesPrevCycle)) {
      const data = await getTableData({ ...props, tableNames: tableNamesPrevCycle, mergeOdp, cycle: prevCycle }, client)

      // replace prev cycle entry key with current cycle
      return {
        [assessmentName]: {
          [cycleName]: countryISOs.reduce((acc, countryIso) => {
            const _props = { assessmentName, cycleName: prevCycle.name, countryIso, data }
            const countryData = RecordAssessmentDatas.getCountryData(_props)
            return { ...acc, [countryIso]: countryData }
          }, {}),
        },
      }
    }
  }

  return {}
}
