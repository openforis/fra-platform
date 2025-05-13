import { CountryIso } from 'meta/area'
import { TableNames } from 'meta/assessment/table'
import { RecordAssessmentDatas, RecordColumnData } from 'meta/data'

import { useAppSelector } from 'client/store'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

const tableName = TableNames.originalDataPointValue

export const useOriginalDataPointData = (): RecordColumnData => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) =>
    RecordAssessmentDatas.getTableData({ assessmentName, cycleName, data: state.data.tableData, countryIso, tableName })
  )
}
