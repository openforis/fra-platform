import { useEffect, useMemo } from 'react'

import { Functions } from 'utils/functions'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions, useTablePaginatedOrderBy, useTablePaginatedPage } from 'client/store/ui/tablePaginated'
import { useTablePaginatedFilters } from 'client/store/ui/tablePaginated/hooks'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { TablePaginatedCounter } from 'client/components/TablePaginated/types'

type Props = {
  counter: TablePaginatedCounter
  limit: number
  path: string
}

export const useFetchData = (props: Props): void => {
  const { counter, limit, path } = props

  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams()
  const filters = useTablePaginatedFilters(path)
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
      filters,
      path,
      sectionName,
    })
  }, [assessmentName, counter, countryIso, cycleName, filters, path, sectionName, throttledGetCount])

  useEffect(() => {
    const params = {
      assessmentName,
      countryIso,
      cycleName,
      filters,
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
    filters,
    limit,
    orderBy,
    page,
    path,
    sectionName,
    throttledGetData,
  ])
}
