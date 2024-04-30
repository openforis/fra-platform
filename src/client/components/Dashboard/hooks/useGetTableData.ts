import { useEffect } from 'react'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { Props } from 'client/components/Dashboard/props'

import { useDependencies } from './useDependencies'

export const useGetTableData = (props: Props): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dependencies = useDependencies(props)

  useEffect(() => {
    if (dependencies.size > 0) {
      const propsFetch = { assessmentName, cycleName, countryIso, mergeOdp: true }
      dispatch(DataActions.getTableData({ ...propsFetch, tableNames: Array.from(dependencies) }))
    }
  }, [assessmentName, countryIso, cycleName, dependencies, dispatch])
}
