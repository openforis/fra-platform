import { CountryIso } from 'meta/area'
import { TableNames } from 'meta/assessment'
import { RecordAssessmentDatas, RecordColumnData } from 'meta/data'

import { useAppSelector } from 'client/store'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useOriginalDataPointData = (): RecordColumnData => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  return useAppSelector((state) =>
    RecordAssessmentDatas.getTableData({
      assessmentName,
      cycleName,
      data: state.data.tableData,
      countryIso: countryIso as CountryIso,
      tableName: TableNames.originalDataPointValue,
    })
  )
}
