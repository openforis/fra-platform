import { CountryIso } from 'meta/area'
import { TableNames } from 'meta/assessment/table'
import { RecordAssessmentDatas, RecordColumnData } from 'meta/data'

import { NodeValuesSelectors } from 'client/store/data/tableData/nodeValues/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

const tableName = TableNames.originalDataPointValue

export const useOriginalDataPointData = (): RecordColumnData => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) => {
    const data = NodeValuesSelectors.getRecordAssessmentData(state)
    return RecordAssessmentDatas.getTableData({ assessmentName, cycleName, data, countryIso, tableName })
  })
}
