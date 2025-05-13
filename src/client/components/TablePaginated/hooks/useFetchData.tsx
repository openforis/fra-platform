import { useEffect, useMemo } from 'react'

import { Functions } from 'utils/functions'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions, useTablePaginatedOrderBy, useTablePaginatedPage } from 'client/store/ui/tablePaginated'
import { useIsTablePaginatedInitialized, useTablePaginatedFilters } from 'client/store/ui/tablePaginated/hooks'
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
  const { assessmentName, countryIso, cycleName, sectionName } = useSectionRouteParams()

  const filters = useTablePaginatedFilters(path)
  const isInitialized = useIsTablePaginatedInitialized(path)
  const orderBy = useTablePaginatedOrderBy(path)
  const page = useTablePaginatedPage(path)

  const throttledGetCount = useMemo(
    () =>
      Functions.throttle(
        (params) => {
          dispatch(TablePaginatedActions.getCount(params))
        },
        500,
        { leading: true, trailing: true }
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
        { leading: true, trailing: true }
      ),
    [dispatch]
  )

  useEffect(() => {
    if (isInitialized && counter?.show) {
      const _props = { assessmentName, countryIso, cycleName, filters, path, sectionName }
      throttledGetCount(_props)
    }
  }, [
    assessmentName,
    counter?.show,
    countryIso,
    cycleName,
    filters,
    isInitialized,
    path,
    sectionName,
    throttledGetCount,
  ])

  useEffect(() => {
    if (isInitialized) {
      const _props = { assessmentName, countryIso, cycleName, filters, limit, orderBy, page, path, sectionName }
      throttledGetData(_props)

      return () => {
        dispatch(TablePaginatedActions.resetData({ path }))
      }
    }
    return undefined
  }, [
    assessmentName,
    countryIso,
    cycleName,
    dispatch,
    filters,
    isInitialized,
    limit,
    orderBy,
    page,
    path,
    sectionName,
    throttledGetData,
  ])
}
