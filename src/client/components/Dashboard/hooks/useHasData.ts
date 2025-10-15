import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Table } from 'meta/assessment/table'
import { RecordAssessmentDatas } from 'meta/data'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useData } from 'client/components/Dashboard/hooks/useData'

export const useHasData = (table: Table): boolean => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
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
  }, [assessmentName, countryIso, cycleName, data, table.props.name])
}
