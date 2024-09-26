import { useCallback, useEffect, useMemo } from 'react'

import { Areas, CountryIso, RegionCode } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import type { Props as GetTableDataProps } from 'client/store/data/actions/getTableDataProps'
import { useHomeCountriesFilter } from 'client/store/ui/home'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { Props } from 'client/components/Dashboard/props'

import { useDependencies } from './useDependencies'

export const useGetTableData = (props: Props): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dependencies = useDependencies(props)
  const homeCountriesFilter = useHomeCountriesFilter()

  const countryISOs = useMemo(
    () => (homeCountriesFilter.length > 0 ? homeCountriesFilter : [countryIso]),
    [homeCountriesFilter, countryIso]
  )

  const fetchTableData = useCallback(() => {
    if (dependencies.size > 0) {
      const tableNames = Array.from(dependencies)
      const propsFetch: GetTableDataProps = { assessmentName, cycleName, countryIso, tableNames, mergeOdp: true }

      // When fetching data for Dashboard region level, include regionCode
      if (!Areas.isISOCountry(countryIso)) {
        propsFetch.regionCode = countryIso as RegionCode
      }
      dispatch(DataActions.getTableData({ ...propsFetch, countryISOs }))
    }
  }, [assessmentName, cycleName, countryIso, dependencies, dispatch, countryISOs])

  useEffect(() => {
    fetchTableData()
  }, [fetchTableData])
}
