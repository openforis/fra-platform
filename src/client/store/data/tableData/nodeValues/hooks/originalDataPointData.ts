import { CountryIso } from 'meta/area/countryIso'
import { RecordColumnData } from 'meta/data/recordData'
import { Objects } from 'utils/objects'

import { NodeValuesSelectors } from 'client/store/data/tableData/nodeValues/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useOriginalDataPointData = (): RecordColumnData => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) => {
    return NodeValuesSelectors.getOriginalDataPointData(state, assessmentName, cycleName, countryIso)
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
