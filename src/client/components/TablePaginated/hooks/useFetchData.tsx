import { useEffect, useMemo } from 'react'

import { Functions } from 'utils/functions'

import { TablePaginatedFilterType } from 'meta/tablePaginated'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions, useTablePaginatedOrderBy, useTablePaginatedPage } from 'client/store/ui/tablePaginated'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { TablePaginatedCounter, TablePaginatedFilter } from 'client/components/TablePaginated/types'

import { useFilterValues } from './useFilterValues'

type Props = {
  counter: TablePaginatedCounter
  filters: Array<TablePaginatedFilter<TablePaginatedFilterType>>
  limit: number
  path: string
}

export const useFetchData = (props: Props): void => {
  const { counter, filters, limit, path } = props

  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams()
  const filterValues = useFilterValues({ filters, path })
  const orderBy = useTablePaginatedOrderBy(path)
  const page = useTablePaginatedPage(path)

  const throttledGetCount = useMemo(
    () =>
      Functions.throttle(
        (params) => {
          dispatch(TablePaginatedActions.getCount(params))
        },
        500,
        { trailing: true }
      ),
    [dispatch]
  )

  const throttledGetData = useMemo(
    () =>
      Functions.throttle(
        (params) => {
          dispatch(TablePaginatedActions.getData(params))
        },
        500,
        { trailing: true }
      ),
    [dispatch]
  )

  useEffect(() => {
    if (!counter.show) return
    throttledGetCount({
      assessmentName,
      countryIso,
      cycleName,
      filters: filterValues,
      path,
      sectionName,
    })
  }, [assessmentName, counter, countryIso, cycleName, filterValues, path, sectionName, throttledGetCount])

  useEffect(() => {
    const params = {
      assessmentName,
      countryIso,
      cycleName,
      filters: filterValues,
      limit,
      orderBy,
      page,
      path,
      sectionName,
    }
    dispatch(TablePaginatedActions.resetData({ path }))
    throttledGetData(params)
  }, [
    assessmentName,
    countryIso,
    cycleName,
    dispatch,
    filterValues,
    limit,
    orderBy,
    page,
    path,
    sectionName,
    throttledGetData,
  ])
}
