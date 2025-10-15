import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { TableNames } from 'meta/assessment/table'
import { RecordAssessmentDatas, RecordColumnData } from 'meta/data'

import { NodeValuesSelectors } from 'client/store/data/tableData/nodeValues/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useOriginalDataPointData = (): RecordColumnData => {
  const tableName = TableNames.originalDataPointValue
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) => {
    const data = NodeValuesSelectors.getRecordAssessmentData(state)
    return RecordAssessmentDatas.getTableData({ assessmentName, cycleName, data, countryIso, tableName })
  })
}

export const useOriginalDataPointYears = (): Array<{ year: string; id: number }> => {
  const odpData = useOriginalDataPointData()

  if (Objects.isEmpty(odpData)) return null

  return Object.entries(odpData).map(([year, data]) => ({
    year,
    id: data.totalLandArea.odpId,
  }))
}

export const useHasOriginalDataPointData = (): boolean => Object.keys(useOriginalDataPointData()).length > 0
