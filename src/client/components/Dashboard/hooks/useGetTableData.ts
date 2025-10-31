import { useCallback, useEffect, useMemo } from 'react'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { RegionCode } from 'meta/area/regionCode'

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

  const countryISOs = useMemo(
    () => (homeCountriesFilter.length > 0 ? homeCountriesFilter : [countryIso]),
    [countryIso, homeCountriesFilter]
  )

  const fetchTableData = useCallback(() => {
    if (dependencies.size > 0) {
      const tableNames = Array.from(dependencies)
      const propsFetch: GetTableDataProps = { assessmentName, cycleName, countryIso, tableNames, mergeOdp: true }

      // When fetching data for Dashboard region level, include regionCode
      if (!Areas.isISOCountry(countryIso)) {
        propsFetch.regionCode = countryIso as RegionCode
      }
      dispatch(NodeValuesActions.getTableData({ ...propsFetch, countryISOs }))
    }
  }, [assessmentName, countryIso, countryISOs, cycleName, dependencies, dispatch])

  useEffect(() => {
    fetchTableData()
  }, [fetchTableData])
}
