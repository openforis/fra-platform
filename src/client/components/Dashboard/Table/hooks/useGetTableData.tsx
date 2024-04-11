import { useEffect } from 'react'

import { CountryIso } from 'meta/area'
import { Table as TableType } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useDependencies } from 'client/components/Dashboard/Table/hooks/useDependencies'

export const useGetTableData = (table: TableType) => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dependencies = useDependencies(table)

  useEffect(() => {
    if (dependencies.size > 0) {
      const propsFetch = { assessmentName, cycleName, countryIso, mergeOdp: true }
      dispatch(DataActions.getTableData({ ...propsFetch, tableNames: Array.from(dependencies) }))
    }
  }, [assessmentName, countryIso, cycleName, dependencies, dispatch])
}
