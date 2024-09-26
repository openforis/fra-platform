import { useEffect, useMemo, useState } from 'react'

import { Functions } from 'utils/functions'

import { TablePaginatedFilterValues } from 'meta/tablePaginated'

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

  const [filtersThrottled, setFiltersThrottled] = useState<Record<string, TablePaginatedFilterValues> | undefined>()

  const updateThrottledFilters = useMemo(
    () =>
      Functions.throttle(
        (newFilters: Record<string, TablePaginatedFilterValues>) => setFiltersThrottled(newFilters),
        500,
        { trailing: true }
      ),
    []
  )

  useEffect(() => {
    updateThrottledFilters(filters)
  }, [filters, updateThrottledFilters])

  useEffect(() => {
    if (!counter.show) return
    dispatch(
      TablePaginatedActions.getCount({
        assessmentName,
        countryIso,
        cycleName,
        filters: filtersThrottled,
        path,
        sectionName,
      })
    )
  }, [assessmentName, counter, countryIso, cycleName, dispatch, filtersThrottled, path, sectionName])

  useEffect(() => {
    const params = {
      assessmentName,
      countryIso,
      cycleName,
      filters: filtersThrottled,
      limit,
      orderBy,
      page,
      path,
      sectionName,
    }
    dispatch(TablePaginatedActions.getData(params))
  }, [assessmentName, countryIso, cycleName, dispatch, filtersThrottled, limit, orderBy, page, path, sectionName])
}
