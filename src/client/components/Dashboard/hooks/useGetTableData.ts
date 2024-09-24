import { useCallback, useEffect, useMemo } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
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
      const propsFetch = { assessmentName, cycleName, countryIso, mergeOdp: true }
      dispatch(DataActions.getTableData({ ...propsFetch, countryISOs, tableNames: Array.from(dependencies) }))
    }
  }, [assessmentName, cycleName, countryIso, dependencies, dispatch, countryISOs])

  useEffect(() => {
    fetchTableData()
  }, [fetchTableData])
}
