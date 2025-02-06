import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Table } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { useHistoryLastApprovedIsActive } from 'client/store/data'
import { useLastApprovedHistoryTableData } from 'client/store/data/hooks/useLastApprovedHistoryTableData'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { ODPColHeader } from 'client/pages/Section/DataTable/Table/types'

type Props = {
  odpYear: ODPColHeader
  table: Table
}

type Returned = {
  added: boolean
  removed: boolean
}

export const useOdpHeaderLastApprovedHistoryInfo = (props: Props): Returned | undefined => {
  const { odpYear, table } = props
  const { name: tableName } = table.props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()
  const historyData = useLastApprovedHistoryTableData()

  return useMemo<Returned | undefined>(() => {
    if (historyLastApprovedIsActive && !Objects.isNil(historyData)) {
      const _props = { assessmentName, cycleName, countryIso, tableName, data: historyData }
      const tableData = RecordAssessmentDatas.getTableData(_props)
      const existsInHistory = Object.values(tableData?.[odpYear.year] ?? {}).some((v) => Boolean(v.odpId))

      return { added: !existsInHistory, removed: Objects.isNil(odpYear.id) }
    }
    return undefined
  }, [assessmentName, countryIso, cycleName, historyData, historyLastApprovedIsActive, odpYear, tableName])
}
