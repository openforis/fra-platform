import { useCallback, useEffect } from 'react'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { RegionCode } from 'meta/area/regionCode'
import { Objects } from 'utils/objects'

import { NodeValuesActions } from 'client/store/data/tableData/nodeValues/actions'
import type { Props as GetTableDataProps } from 'client/store/data/tableData/nodeValues/actions/getTableDataProps'
import { useAppDispatch } from 'client/store/hooks'
import { useGlobalCountries } from 'client/store/ui/countryReport/hooks/globalCountries'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { Props } from 'client/components/Dashboard/props'

import { useDependencies } from './useDependencies'

export const useGetTableData = (props: Props): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const dependencies = useDependencies(props)
  const homeCountriesFilter = useGlobalCountries()

  const fetchTableData = useCallback(() => {
    if (dependencies.size > 0) {
      const tableNames = Array.from(dependencies)
      const propsFetch: GetTableDataProps = { assessmentName, cycleName, tableNames, mergeOdp: true }

      if (Areas.isISOCountry(countryIso)) {
        propsFetch.countryISOs = [countryIso]
      } else {
        propsFetch.regionCode = countryIso as RegionCode
        propsFetch.countryISOs = Objects.isEmpty(homeCountriesFilter) ? undefined : homeCountriesFilter
      }
      dispatch(NodeValuesActions.getTableData(propsFetch))
    }
  }, [assessmentName, countryIso, cycleName, dependencies, dispatch, homeCountriesFilter])

  useEffect(() => {
    fetchTableData()
  }, [fetchTableData])
}
