import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Table } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useData } from 'client/components/Dashboard/hooks/useData'

export const useHasData = (table: Table): boolean => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const data = useData(table)

  return useMemo(() => {
    const tableData = RecordAssessmentDatas.getTableData({
      assessmentName,
      cycleName,
      countryIso,
      tableName: table.props.name,
      data,
    })

    // tableData not fetched
    if (Objects.isEmpty(tableData)) return true

    return !RecordAssessmentDatas.isTableDataEmpty({
      assessmentName,
      cycleName,
      countryIso,
      tableName: table.props.name,
      data,
    })
  }, [data, assessmentName, cycleName, countryIso, table.props.name])
}
