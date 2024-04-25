import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Table } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useData } from 'client/components/Dashboard/hooks/useData'

export const useHasData = (table: Table): boolean => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const _data = useData(table)

  // tableData not fetched
  if (Objects.isEmpty(_data)) return true

  return !RecordAssessmentDatas.isTableDataEmpty({
    assessmentName,
    cycleName,
    countryIso,
    tableName: table.props.name,
    data: _data,
  })
}
