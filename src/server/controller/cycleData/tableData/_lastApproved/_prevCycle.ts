import { TableName } from 'meta/assessment/table'
import { HistoryLastApprovedInfo } from 'meta/cycleData/history/lastApproved'
import { RecordAssessmentData } from 'meta/data/recordData'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { Objects } from 'utils/objects'

import { TableRedisRepository } from 'server/cache/repository/table'
import { getData } from 'server/controller/cycleData/tableData/getData'
import { PropsGetTableData } from 'server/controller/cycleData/tableData/props'
import { BaseProtocol, DB } from 'server/db/db'

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
      const data = await getData({ ...props, tableNames: tableNamesPrevCycle, mergeOdp, cycle: prevCycle }, client)

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
